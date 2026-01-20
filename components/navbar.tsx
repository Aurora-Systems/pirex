"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "#categories", label: "Categories" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-white rounded-md px-2 py-1">
              <Image
                src="/images/pirex-logo.png"
                alt="Pirex Computers"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:gap-2">
            {/*<Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-gold"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-gold relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gold text-[10px] font-medium text-background flex items-center justify-center">
                0
              </span>
              <span className="sr-only">Cart</span>
            </Button>*/}
            <ThemeToggle />
            <Button className="bg-gold text-background hover:bg-gold/90 font-medium ml-2">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden rounded-lg p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6">
            <div className="flex flex-col gap-4 pt-4 border-t border-border">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-gold"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                {/*<Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gold text-[10px] font-medium text-background flex items-center justify-center">
                    0
                  </span>
                </Button>*/}
                <ThemeToggle />
                <Button className="bg-gold text-background hover:bg-gold/90 font-medium flex-1">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
