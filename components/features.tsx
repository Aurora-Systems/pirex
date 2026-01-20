"use client"

import { Shield, Truck, HeadphonesIcon, Users, Award, Lightbulb } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Customer Focus",
    description: "We take time to understand your unique requirements and develop customized solutions.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Trusted partnerships with HP, Cisco, Lenovo, Dell, and Epson ensure authentic products.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Cutting-edge ICT solutions that keep your business ahead of the technology curve.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Professionally qualified technicians delivering specialist services and support.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Stock available within 24 hours, special orders delivered in 7-14 days.",
  },
  {
    icon: HeadphonesIcon,
    title: "After-Sales Support",
    description: "Dedicated technical unit with warranty centers ensuring comprehensive support.",
  },
]

export function Features() {
  return (
    <section id="about" className="relative py-20 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-medium tracking-wider uppercase">
            Our Values
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            The Pirex Commitment
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Since 2004, we have built our reputation on delivering quality ICT solutions with unwavering dedication to our core values.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group glass rounded-2xl p-8 transition-all duration-300 hover:border-gold/30"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 text-gold mb-6 transition-all duration-300 group-hover:bg-gold group-hover:text-background">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-gold transition-colors">
                {feature.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
