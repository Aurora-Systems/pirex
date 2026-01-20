"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DB, { SHOP_ID } from "@/lib/superbase";

interface Product {
  id: string;
  item_name: string;
  price: number;
  in_stock: number;
  category_id: number;
  image_id: string;
  description: string;
  asset_id: string | null;
  user_id: string;
  category?: {
    category: string;
  };
}

interface FeaturedProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  imageUrl: string | null;
  inStock: number;
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<FeaturedProduct | null>(null);

  // Helper function to get public URL for image
  function getImageUrl(imageId: string | null): string | null {
    if (!imageId) return null;

    const { data } = DB.storage.from("images").getPublicUrl(imageId);

    return data.publicUrl;
  }

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        setLoading(true);

        // Try multiple approaches to fetch products
        let data = null;
        let error = null;

        // Approach 1: Try with categories join
        try {
          const result = await DB.from("items")
            .select(
              `
              *,
              categories!inner(
                category
              )
            `,
            )
            .eq("categories.user_id", SHOP_ID)
            .eq("user_id", SHOP_ID)
            .gt("in_stock", 0)
            .limit(3);

          if (result.error) throw result.error;
          data = result.data;
        } catch (joinError) {
          console.log("Categories join failed, trying fallbacks:", joinError);

          // Approach 2: Try without categories join
          try {
            const result = await DB.from("items")
              .select("*")
              .eq("user_id", SHOP_ID)
              .gt("in_stock", 0)
              .limit(3);

            if (result.error) throw result.error;
            data = result.data;
          } catch (basicError) {
            console.log(
              "Basic products query failed, trying with different conditions:",
              basicError,
            );

            // Approach 3: Try with minimal conditions
            try {
              const result = await DB.from("items")
                .select("*")
                .eq("user_id", SHOP_ID)
                .limit(3);

              if (result.error) throw result.error;
              data = result.data;
            } catch (minimalError) {
              console.log(
                "Minimal query failed, using fallback data:",
                minimalError,
              );

              // Approach 4: Use fallback data if database is not set up
              data = [
                {
                  id: "1",
                  item_name: "Sample Product 1",
                  price: 299,
                  in_stock: 10,
                  category_id: 1,
                  description: "Sample product description",
                  categories: { category: "Electronics" },
                },
                {
                  id: "2",
                  item_name: "Sample Product 2",
                  price: 199,
                  in_stock: 5,
                  category_id: 2,
                  description: "Sample product description",
                  categories: { category: "Accessories" },
                },
                {
                  id: "3",
                  item_name: "Sample Product 3",
                  price: 499,
                  in_stock: 3,
                  category_id: 3,
                  description: "Sample product description",
                  categories: { category: "Computers" },
                },
              ];
              setError(
                "Using sample data - database connection may need setup",
              );
            }
          }
        }

        if (data && data.length > 0) {
          console.log("Fetched products:", data);

          // Transform database data to component format
          const transformedProducts: FeaturedProduct[] = data.map(
            (product: any, index: number) => ({
              id: product.id || `product-${index}`,
              name: product.item_name || `Product ${index + 1}`,
              category: product.categories?.category || "General",
              price: product.price || 99,
              description:
                product.description ||
                "High-quality product with excellent features",
              image: getProductEmoji(product.categories?.category || "General"),
              imageUrl: getImageUrl(product.image_id),
              inStock: product.in_stock || 0,
            }),
          );

          setProducts(transformedProducts);
        } else {
          console.log("No products found, using fallback");
          // Set fallback products if no data
          setProducts([
            {
              id: "fallback-1",
              name: "Featured Product 1",
              category: "Electronics",
              price: 299,
              description: "High-quality electronics with excellent features",
              image: "📱",
              imageUrl: null,
              inStock: 5,
            },
            {
              id: "fallback-2",
              name: "Featured Product 2",
              category: "Computers",
              price: 599,
              description: "Powerful computer technology for all your needs",
              image: "💻",
              imageUrl: null,
              inStock: 3,
            },
            {
              id: "fallback-3",
              name: "Featured Product 3",
              category: "Accessories",
              price: 149,
              description: "Premium accessories to enhance your experience",
              image: "🎧",
              imageUrl: null,
              inStock: 8,
            },
          ]);
          setError("Using fallback data - please check database setup");
        }
      } catch (err) {
        console.error("Error in fetchFeaturedProducts:", err);
        setError(`Database error: ${err}. Using fallback data.`);

        // Always provide fallback products even on complete failure
        setProducts([
          {
            id: "error-fallback-1",
            name: "Sample Product 1",
            category: "Electronics",
            price: 299,
            description: "High-quality electronics with excellent features",
            image: "📱",
            imageUrl: null,
            inStock: 5,
          },
          {
            id: "error-fallback-2",
            name: "Sample Product 2",
            category: "Computers",
            price: 599,
            description: "Powerful computer technology for all your needs",
            image: "💻",
            imageUrl: null,
            inStock: 3,
          },
          {
            id: "error-fallback-3",
            name: "Sample Product 3",
            category: "Accessories",
            price: 149,
            description: "Premium accessories to enhance your experience",
            image: "🎧",
            imageUrl: null,
            inStock: 8,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

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

    return "📦"; // Default emoji
  }

  // Helper function to generate WhatsApp URL
  function generateWhatsAppUrl(productName: string): string {
    const phoneNumber = "263772572037"; // Remove the + for WhatsApp URL format
    const message = encodeURIComponent(`I want to buy ${productName}`);
    return `https://wa.me/${phoneNumber}?text=${message}`;
  }

  if (loading) {
    return (
      <section className="relative py-20 md:py-32 bg-secondary/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-gold/3 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-gold text-sm font-medium tracking-wider uppercase">
                Featured
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Products
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                Loading our featured products...
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                <div className="aspect-square rounded-xl bg-secondary/50 mb-6" />
                <div className="h-4 bg-secondary/50 rounded mb-2" />
                <div className="h-6 bg-secondary/50 rounded mb-2" />
                <div className="h-4 bg-secondary/50 rounded w-3/4 mb-4" />
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-secondary/50 rounded w-20" />
                  <div className="w-10 h-10 bg-secondary/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Note: We now handle errors gracefully and show products even with errors

  return (
    <section className="relative py-20 md:py-32 bg-secondary/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-gold/3 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              Featured
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Products
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Some of our recently added products
              {error && (
                <span className="block text-sm text-orange-500 mt-1">
                  {error}
                </span>
              )}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="mt-6 md:mt-0 border-border hover:border-gold hover:text-gold bg-transparent"
          >
            <Link href="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:border-gold/30"
            >
              {/* Product Image */}
              <div className="relative aspect-square rounded-xl bg-secondary/50 flex items-center justify-center mb-6 overflow-hidden">
                {product.imageUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-xl"
                      onError={(e) => {
                        // Hide image and show emoji fallback
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
                  {product.image}
                </span>
                <div className="absolute inset-0 bg-gold/0 transition-colors group-hover:bg-gold/5 rounded-xl" />
              </div>

              {/* Product Info */}
              <div>
                <span className="text-xs text-gold font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-gold transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-muted-foreground line-clamp-1">
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
                    onClick={() => setSelectedProduct(product)}
                  >
                    View Item
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gold text-background hover:bg-gold/90"
                    disabled={product.inStock === 0}
                    onClick={() => {
                      if (product.inStock > 0) {
                        window.open(
                          generateWhatsAppUrl(product.name),
                          "_blank",
                        );
                      }
                    }}
                  >
                    Buy Now
                  </Button>
                </div>

                {/* Stock Status */}
                {product.inStock === 0 && (
                  <p className="mt-2 text-sm text-red-500 font-medium">
                    Out of Stock
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Fallback message if no products */}
        {products.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No featured products available at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
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
                  onClick={() => setSelectedProduct(null)}
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
                  {selectedProduct.imageUrl ? (
                    <img
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-8xl">{selectedProduct.image}</span>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gold font-medium uppercase tracking-wider">
                      {selectedProduct.category}
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-foreground">
                      {selectedProduct.name}
                    </h3>
                  </div>

                  <div className="text-3xl font-bold text-foreground">
                    ${selectedProduct.price.toLocaleString()}
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Description
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4">
                    <Button
                      className="w-full bg-gold text-background hover:bg-gold/90"
                      disabled={selectedProduct.inStock === 0}
                      onClick={() => {
                        if (selectedProduct.inStock > 0) {
                          window.open(
                            generateWhatsAppUrl(selectedProduct.name),
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
    </section>
  );
}
