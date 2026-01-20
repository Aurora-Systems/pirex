"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  ShoppingCart,
  Search,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  ChevronLeft,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DB, { SHOP_ID } from "@/lib/superbase";

interface Product {
  id: string;
  item_name: string;
  category: string;
  price: number;
  image_id: string;
  description: string;
  in_stock: number;
  imageUrl: string | null;
}

interface Category {
  id: number;
  category: string;
  user_id: string;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
];

function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 md:pt-24">
        <div className="border-b border-border bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="h-4 bg-secondary/50 rounded w-32 mb-4 animate-pulse"></div>
            <div className="h-10 bg-secondary/50 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-secondary/50 rounded w-96 animate-pulse"></div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                <div className="aspect-square rounded-xl bg-secondary/50 mb-6"></div>
                <div className="h-4 bg-secondary/50 rounded mb-2"></div>
                <div className="h-6 bg-secondary/50 rounded mb-2"></div>
                <div className="h-4 bg-secondary/50 rounded w-3/4 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-secondary/50 rounded w-20"></div>
                  <div className="w-10 h-10 bg-secondary/50 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function ShopPage() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Database state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductModal, setSelectedProductModal] =
    useState<Product | null>(null);

  // Helper function to get public URL for image
  function getImageUrl(imageId: string | null): string | null {
    if (!imageId) return null;
    const { data } = DB.storage.from("images").getPublicUrl(imageId);
    return data.publicUrl;
  }

  // Helper function to get emoji based on category
  function getProductEmoji(category: string): string {
    const categoryLower = category.toLowerCase();

    if (categoryLower.includes("laptop") || categoryLower.includes("computer"))
      return "💻";
    if (categoryLower.includes("phone") || categoryLower.includes("mobile"))
      return "📱";
    if (categoryLower.includes("tablet")) return "📱";
    if (categoryLower.includes("watch")) return "⌚";
    if (categoryLower.includes("headphone") || categoryLower.includes("audio"))
      return "🎧";
    if (categoryLower.includes("camera")) return "📷";
    if (categoryLower.includes("printer")) return "🖨️";
    if (categoryLower.includes("projector")) return "📽️";
    if (categoryLower.includes("monitor") || categoryLower.includes("display"))
      return "🖥️";
    if (categoryLower.includes("keyboard")) return "⌨️";
    if (categoryLower.includes("mouse")) return "🖱️";
    if (categoryLower.includes("speaker")) return "🔊";
    if (categoryLower.includes("gaming")) return "🎮";
    if (categoryLower.includes("tv") || categoryLower.includes("television"))
      return "📺";

    return "📦";
  }

  // Helper function to generate WhatsApp URL
  function generateWhatsAppUrl(productName: string): string {
    const phoneNumber = "263772572037";
    const message = encodeURIComponent(`I want to buy ${productName}`);
    return `https://wa.me/${phoneNumber}?text=${message}`;
  }

  // Fetch data from database
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch categories first
        const { data: categoriesData, error: categoriesError } = await DB.from(
          "categories",
        )
          .select("*")
          .eq("user_id", SHOP_ID);

        if (categoriesError) {
          console.error("Error fetching categories:", categoriesError);
          setError("Failed to fetch categories");
          return;
        }

        // Fetch items with category information
        const { data: itemsData, error: itemsError } = await DB.from("items")
          .select(
            `
            *,
            categories(
              category
            )
          `,
          )
          .eq("user_id", SHOP_ID)
          .gt("in_stock", 0);

        if (itemsError) {
          console.error("Error fetching items:", itemsError);
          setError("Failed to fetch items");
          return;
        }

        if (categoriesData) {
          setCategories(categoriesData);
        }

        if (itemsData) {
          const transformedProducts: Product[] = itemsData.map((item: any) => ({
            id: item.id || `item-${Math.random()}`,
            item_name: item.item_name || "Unnamed Product",
            category: item.categories?.category || "General",
            price: item.price || 0,
            image_id: item.image_id,
            description: item.description || "No description available",
            in_stock: item.in_stock || 0,
            imageUrl: getImageUrl(item.image_id),
          }));

          setProducts(transformedProducts);
        }
      } catch (err) {
        console.error("Error in fetchData:", err);
        setError(`Database error: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Create category options for select
  const categoryOptions = useMemo(() => {
    const options = [{ value: "all", label: "All Products" }];
    categories.forEach((cat) => {
      options.push({ value: cat.category, label: cat.category });
    });
    return options;
  }, [categories]);

  const filteredProducts = useMemo(() => {
    let filteredList = [...products];

    // Filter by search
    if (searchQuery) {
      filteredList = filteredList.filter(
        (p) =>
          p.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filteredList = filteredList.filter(
        (p) => p.category === selectedCategory,
      );
    }

    // Filter by price
    filteredList = filteredList.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        filteredList.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredList.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filteredList.sort((a, b) => a.item_name.localeCompare(b.item_name));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filteredList;
  }, [products, searchQuery, selectedCategory, sortBy, priceRange]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 md:pt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="glass-card rounded-xl p-12 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button
                variant="outline"
                className="border-gold text-gold hover:bg-gold/10 bg-transparent"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 md:pt-24">
        {/* Page Header */}
        <div className="border-b border-border bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span className="text-foreground">Shop</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Shop All Products
            </h1>
            <p className="mt-2 text-muted-foreground">
              Discover our complete collection of premium technology solutions.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-secondary/50 border-border focus:border-gold"
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {/* Category Filter */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px] h-11 bg-secondary/50 border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {categoryOptions.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] h-11 bg-secondary/50 border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="lg:hidden border-border hover:border-gold bg-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center gap-1 glass rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className={
                    viewMode === "grid" ? "bg-gold text-background" : ""
                  }
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className={
                    viewMode === "list" ? "bg-gold text-background" : ""
                  }
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="lg:hidden glass-card rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={4000}
                    step={50}
                    className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="glass-card rounded-xl p-6 sticky top-28">
                <h3 className="font-semibold text-foreground mb-6">Filters</h3>

                {/* Price Range */}
                <div className="mb-8">
                  <label className="text-sm font-medium text-foreground mb-4 block">
                    Price Range
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={4000}
                    step={50}
                    className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold"
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Category Links */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    Categories
                  </h4>
                  <ul className="space-y-2">
                    {categoryOptions.map((cat) => (
                      <li key={cat.value}>
                        <button
                          type="button"
                          onClick={() => setSelectedCategory(cat.value)}
                          className={`text-sm transition-colors w-full text-left py-1 ${
                            selectedCategory === cat.value
                              ? "text-gold font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {cat.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full mt-8 border-border hover:border-gold hover:text-gold bg-transparent"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setPriceRange([0, 4000]);
                    setSortBy("featured");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredProducts.length} of {products.length} products
              </p>

              {filteredProducts.length === 0 ? (
                <div className="glass-card rounded-xl p-12 text-center">
                  <p className="text-muted-foreground">
                    No products found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-gold text-gold hover:bg-gold/10 bg-transparent"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setPriceRange([0, 4000]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={setSelectedProductModal}
                      generateWhatsAppUrl={generateWhatsAppUrl}
                      getProductEmoji={getProductEmoji}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <ProductListItem
                      key={product.id}
                      product={product}
                      onViewDetails={setSelectedProductModal}
                      generateWhatsAppUrl={generateWhatsAppUrl}
                      getProductEmoji={getProductEmoji}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Product Details
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedProductModal(null)}
                  className="hover:border-gold hover:text-gold"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className="aspect-square rounded-xl bg-secondary/50 flex items-center justify-center overflow-hidden">
                  {selectedProductModal.imageUrl ? (
                    <img
                      src={selectedProductModal.imageUrl}
                      alt={selectedProductModal.item_name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-8xl">
                      {getProductEmoji(selectedProductModal.category)}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gold font-medium uppercase tracking-wider">
                      {selectedProductModal.category}
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-foreground">
                      {selectedProductModal.item_name}
                    </h3>
                  </div>

                  <div className="text-3xl font-bold text-foreground">
                    ${selectedProductModal.price.toLocaleString()}
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Description
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProductModal.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4">
                    <Button
                      className="w-full bg-gold text-background hover:bg-gold/90"
                      disabled={selectedProductModal.in_stock === 0}
                      onClick={() => {
                        if (selectedProductModal.in_stock > 0) {
                          window.open(
                            generateWhatsAppUrl(selectedProductModal.item_name),
                            "_blank",
                          );
                        }
                      }}
                    >
                      Buy Now via WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

function ProductCard({
  product,
  onViewDetails,
  generateWhatsAppUrl,
  getProductEmoji,
}: {
  product: Product;
  onViewDetails: (product: Product) => void;
  generateWhatsAppUrl: (name: string) => string;
  getProductEmoji: (category: string) => string;
}) {
  return (
    <div className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:border-gold/30">
      {/* Product Image */}
      <div className="relative aspect-square rounded-xl bg-secondary/50 flex items-center justify-center mb-6 overflow-hidden">
        {product.imageUrl ? (
          <div className="relative w-full h-full">
            <img
              src={product.imageUrl}
              alt={product.item_name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const container = target.parentElement;
                if (container) {
                  container.style.display = "none";
                  const emojiSpan =
                    container.nextElementSibling as HTMLSpanElement;
                  if (emojiSpan) emojiSpan.style.display = "block";
                }
              }}
            />
          </div>
        ) : null}
        <span
          className={`text-6xl transition-transform duration-300 group-hover:scale-110 ${
            product.imageUrl ? "hidden" : "block"
          }`}
        >
          {getProductEmoji(product.category)}
        </span>
        <div className="absolute inset-0 bg-gold/0 transition-colors group-hover:bg-gold/5 rounded-xl" />
      </div>

      {/* Product Info */}
      <div>
        <span className="text-xs text-gold font-medium uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-gold transition-colors">
          {product.item_name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-4">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-border hover:border-gold hover:text-gold"
            onClick={() => onViewDetails(product)}
          >
            View Item
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-gold text-background hover:bg-gold/90"
            disabled={product.in_stock === 0}
            onClick={() => {
              if (product.in_stock > 0) {
                window.open(generateWhatsAppUrl(product.item_name), "_blank");
              }
            }}
          >
            Buy Now
          </Button>
        </div>

        {/* Stock Status */}
        {product.in_stock === 0 && (
          <p className="mt-2 text-sm text-red-500 font-medium">Out of Stock</p>
        )}
      </div>
    </div>
  );
}

function ProductListItem({
  product,
  onViewDetails,
  generateWhatsAppUrl,
  getProductEmoji,
}: {
  product: Product;
  onViewDetails: (product: Product) => void;
  generateWhatsAppUrl: (name: string) => string;
  getProductEmoji: (category: string) => string;
}) {
  return (
    <div className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:border-gold/30">
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="relative w-32 h-32 rounded-xl bg-secondary/50 flex items-center justify-center shrink-0 overflow-hidden">
          {product.imageUrl ? (
            <div className="relative w-full h-full">
              <img
                src={product.imageUrl}
                alt={product.item_name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const container = target.parentElement;
                  if (container) {
                    container.style.display = "none";
                    const emojiSpan =
                      container.nextElementSibling as HTMLSpanElement;
                    if (emojiSpan) emojiSpan.style.display = "block";
                  }
                }}
              />
            </div>
          ) : null}
          <span
            className={`text-4xl transition-transform duration-300 group-hover:scale-110 ${
              product.imageUrl ? "hidden" : "block"
            }`}
          >
            {getProductEmoji(product.category)}
          </span>
          <div className="absolute inset-0 bg-gold/0 transition-colors group-hover:bg-gold/5 rounded-xl" />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gold font-medium uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="mt-1 text-xl font-semibold text-foreground group-hover:text-gold transition-colors">
            {product.item_name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">
              ${product.price.toLocaleString()}
            </span>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:border-gold hover:text-gold"
                onClick={() => onViewDetails(product)}
              >
                View Item
              </Button>
              <Button
                size="sm"
                className="bg-gold text-background hover:bg-gold/90"
                disabled={product.in_stock === 0}
                onClick={() => {
                  if (product.in_stock > 0) {
                    window.open(
                      generateWhatsAppUrl(product.item_name),
                      "_blank",
                    );
                  }
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Stock Status */}
          {product.in_stock === 0 && (
            <p className="mt-2 text-sm text-red-500 font-medium">
              Out of Stock
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPageWithSuspense() {
  return (
    <Suspense fallback={<Loading />}>
      <ShopPage />
    </Suspense>
  );
}
