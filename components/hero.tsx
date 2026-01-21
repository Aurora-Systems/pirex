"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Laptop, Wrench, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Technology background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70 dark:bg-black/75" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        {/* Accent glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="glass-gold rounded-full px-4 py-2 mb-8">
            <span className="text-sm font-medium text-gold">
              <i>EST.</i> 2004 - Two Decades of Excellence
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-5xl text-balance">
            Your Complete
            <span className="block text-gold mt-2">ICT Solutions Partner</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            As a trusted Value Added Reseller, we deliver premium computer
            hardware and technical services backed by experienced professionals.
            Your one-stop destination for all IT needs.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gold text-background hover:bg-gold-light font-medium px-8 h-12"
            >
              <Link href="/shop">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {[
              { value: "20+", label: "Years Experience" },
              { value: "5+", label: "Global Partners" },
              { value: "100%", label: "Warranty Support" },
              { value: "24hrs", label: "Fast Delivery" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image/Glass Card */}
        <div className="mt-16 md:mt-24 relative">
          <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="relative grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Hardware Sales",
                  description:
                    "Authorized partner for HP, Cisco, Lenovo, Dell, and Epson products.",
                  Icon: Laptop,
                },
                {
                  title: "Technical Support",
                  description:
                    "Professional LAN/WAN setup, repairs, and maintenance services.",
                  Icon: Wrench,
                },
                {
                  title: "Custom Solutions",
                  description:
                    "Tailored IT solutions designed to meet your specific business needs.",
                  Icon: Lightbulb,
                },
              ].map((item) => (
                <div key={item.title} className="group cursor-pointer">
                  <div className="glass rounded-xl p-6 transition-all duration-300 hover:border-gold/30">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                      <item.Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
