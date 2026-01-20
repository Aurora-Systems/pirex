"use client"

import React from "react"

import { useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="relative py-20 md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-gold rounded-3xl p-8 md:p-16 overflow-hidden relative">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
          
          <div className="relative text-center max-w-2xl mx-auto">
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              Stay Updated
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
              Subscribe to Our Newsletter
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get the latest news, exclusive offers, and tech insights delivered to your inbox.
            </p>

            {isSubmitted ? (
              <div className="mt-8 flex items-center justify-center gap-3 text-gold">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-medium">Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-background/50 border-border focus:border-gold text-foreground placeholder:text-muted-foreground"
                    required
                  />
                  <Button
                    type="submit"
                    className="h-12 bg-gold text-background hover:bg-gold-light font-medium px-8 shrink-0"
                  >
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}

            <p className="mt-4 text-sm text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
