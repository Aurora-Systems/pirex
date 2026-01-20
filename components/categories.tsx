"use client"

import Link from "next/link"
import { Laptop, Monitor, Printer, Projector, Code2, ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Laptops",
    description: "Premium notebooks from HP, Lenovo, and Dell for professionals and students",
    icon: Laptop,
    count: "Multiple Brands",
    href: "/shop?category=laptops",
  },
  {
    name: "Desktops",
    description: "High-performance desktop units and workstations for business and home",
    icon: Monitor,
    count: "Custom Configs",
    href: "/shop?category=desktops",
  },
  {
    name: "Printers",
    description: "Epson and HP printing solutions with consumables and support",
    icon: Printer,
    count: "Full Range",
    href: "/shop?category=printers",
  },
  {
    name: "Projectors",
    description: "Professional presentation equipment for boardrooms and classrooms",
    icon: Projector,
    count: "Top Brands",
    href: "/shop?category=projectors",
  },
  {
    name: "Software",
    description: "Windows, specialist applications, and enterprise software solutions",
    icon: Code2,
    count: "Licensed",
    href: "/shop?category=software",
  },
]

export function Categories() {
  return (
    <section id="categories" className="relative py-20 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-medium tracking-wider uppercase">
            Hardware & Software
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            Product Categories
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            As authorized partners for HP, Cisco, Lenovo, Dell, and Epson, we offer genuine products at competitive prices with full warranty support.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`group relative glass-card rounded-2xl p-8 transition-all duration-500 hover:border-gold/30 ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gold/0 transition-all duration-500 group-hover:bg-gold/5" />
              
              <div className="relative flex flex-col h-full">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 text-gold mb-6 ${
                  index === 0 ? "lg:w-20 lg:h-20" : ""
                }`}>
                  <category.icon className={`${index === 0 ? "w-8 h-8 lg:w-10 lg:h-10" : "w-7 h-7"}`} />
                </div>
                
                <h3 className={`font-semibold text-foreground group-hover:text-gold transition-colors ${
                  index === 0 ? "text-2xl lg:text-3xl" : "text-xl"
                }`}>
                  {category.name}
                </h3>
                
                <p className={`mt-2 text-muted-foreground ${index === 0 ? "text-base lg:text-lg" : "text-sm"}`}>
                  {category.description}
                </p>
                
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <span className="text-sm text-gold font-medium">
                    {category.count}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-gold transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
