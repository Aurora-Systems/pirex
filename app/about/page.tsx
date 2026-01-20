"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Users,
  Award,
  Target,
  Heart,
  Lightbulb,
  Shield,
  Handshake,
  Star,
  Trophy,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    {
      icon: Users,
      title: "Customer Focus",
      description: "Putting our clients at the center of everything we do",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "Building trust through honest and transparent business practices",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Embracing cutting-edge technology to deliver modern solutions",
    },
    {
      icon: CheckCircle,
      title: "Accountability",
      description: "Taking responsibility for our commitments and deliverables",
    },
    {
      icon: Handshake,
      title: "Teamwork",
      description: "Collaborating effectively to achieve exceptional outcomes",
    },
    {
      icon: Star,
      title: "Excellence",
      description: "Maintaining the highest standards in all our services",
    },
  ];

  const partners = [
    { name: "Hewlett Packard", logo: "/images/partners/hp-logo.png" },
    { name: "Cisco", logo: "/images/partners/cisco-logo.png" },
    { name: "Lenovo", logo: "/images/partners/lenovo-logo.png" },
    { name: "Dell", logo: "/images/partners/dell-logo.png" },
    { name: "Epson", logo: "/images/partners/epson-logo.png" },
    {
      name: "Western Digital",
      logo: "/images/partners/western-digital-logo.png",
    },
    { name: "Sophos", logo: "/images/partners/sophos-logo.png" },
    { name: "Verbatim", logo: "/images/partners/verbatim-logo.png" },
    { name: "Kaspersky", logo: "/images/partners/kaspersky-logo.png" },
    { name: "Veeam", logo: "/images/partners/veeam-logo.png" },
    { name: "Samsung", logo: "/images/partners/samsung-logo.png" },
    {
      name: "Ruckus Wireless",
      logo: "/images/partners/ruckus-wireless-logo.png",
    },
    { name: "Eset", logo: "/images/partners/eset-logo.png" },
    { name: "Zebra", logo: "/images/partners/zebra-logo.png" },
    { name: "Asus", logo: "/images/partners/asus-logo.png" },
    { name: "Targus", logo: "/images/partners/targus-logo.png" },
    { name: "APC", logo: "/images/partners/apc-logo.png" },
  ];

  const services = [
    {
      title: "Complete Hardware Solutions",
      description:
        "From desktops to enterprise servers, we provide comprehensive hardware packages",
    },
    {
      title: "Technical Support Services",
      description:
        "Professional maintenance and support backed by certified technicians",
    },
    {
      title: "Warranty & After-Sales Care",
      description:
        "Dedicated warranty centers ensuring your technology investments are protected",
    },
    {
      title: "Custom IT Consulting",
      description:
        "Tailored solutions designed to match your unique business requirements",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-linear-to-br from-gold/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="h-4 w-4" />
              Established 2004
            </div>
            <div className="mb-8">
              <div className="inline-block bg-white rounded-lg p-4 mx-auto">
                <Image
                  src="/images/pirex-logo.png"
                  alt="Pirex Computers Logo"
                  width={200}
                  height={80}
                  className="mx-auto"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              About <span className="text-gold">Pirex Computers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
              For nearly two decades, we've been Zimbabwe's trusted technology
              partner, delivering comprehensive ICT solutions that drive
              business success and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Pioneering Technology Solutions Since 2004
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Pirex Computers stands as Zimbabwe's premier technology
                  solutions provider, with nearly 20 years of experience in
                  delivering exceptional ICT services. Since our establishment,
                  we've grown from a small computer retailer to a comprehensive
                  technology partner serving businesses of all sizes.
                </p>
                <p>
                  Our extensive portfolio encompasses premium computer hardware,
                  innovative software solutions, and professional technical
                  services. What sets us apart is our commitment to
                  understanding each client's unique challenges and crafting
                  bespoke solutions that align with their specific objectives
                  and budgets.
                </p>
                <p>
                  We believe technology should empower, not complicate. That's
                  why our team of seasoned professionals works tirelessly to
                  ensure every solution we deliver enhances productivity, drives
                  efficiency, and supports long-term growth.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src="/images/about-hero.jpg"
                  alt="Pirex Computers Technology Solutions"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <Card className="glass-card text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-gold" />
              </div>
              <CardTitle className="text-3xl font-bold">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                To serve as your comprehensive technology destination, providing
                an extensive range of cutting-edge computer hardware, innovative
                software solutions, and expert technical services. Our mission
                is powered by a dedicated team of industry professionals
                committed to delivering excellence in every interaction.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted Global Partners</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our strategic partnerships with industry leaders enable us to
              deliver cutting-edge solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-white rounded-lg border hover:shadow-md transition-shadow h-24"
              >
                <span className="font-semibold text-center text-sm text-muted-foreground">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="glass-card inline-block">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gold" />
                    <span>Certified VAR Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gold" />
                    <span>Official Warranty Centers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-gold" />
                    <span>Competitive Partner Pricing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define our commitment to
              excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="glass-card group hover:scale-105 transition-transform"
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <value.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive technology solutions backed by industry-leading
              partnerships
            </p>
          </div>

          {/* Hardware Expertise */}
          <Card className="glass-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Zap className="h-6 w-6 text-gold" />
                Hardware Excellence
              </CardTitle>
              <p className="text-muted-foreground">
                As a certified Value Added Reseller (VAR), we're your reliable
                technology partner
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-muted-foreground mb-6">
                    Our status as a Value Added Reseller positions us uniquely
                    in the market. We've cultivated strategic partnerships with
                    global technology leaders, enabling us to offer the most
                    advanced products at competitive pricing. Our comprehensive
                    warranty support ensures your technology investments remain
                    protected long after purchase.
                  </p>
                  <div className="space-y-3">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                        <div>
                          <h4 className="font-medium">{service.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="p-4 bg-gold/5 rounded-lg border border-gold/20">
                    <h5 className="font-medium text-gold mb-2">
                      Why Choose Our Hardware Solutions?
                    </h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Latest technology from industry leaders</li>
                      <li>• Competitive pricing with VAR benefits</li>
                      <li>• Comprehensive warranty coverage</li>
                      <li>• Professional installation & setup</li>
                      <li>• Ongoing technical support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Audience */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Building2 className="mx-auto h-12 w-12 text-gold mb-4" />
                <h3 className="font-semibold mb-2">Business Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade hardware and services for businesses of all
                  sizes
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Users className="mx-auto h-12 w-12 text-gold mb-4" />
                <h3 className="font-semibold mb-2">Educational Sector</h3>
                <p className="text-sm text-muted-foreground">
                  Specialized solutions for students and educational
                  institutions
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Trophy className="mx-auto h-12 w-12 text-gold mb-4" />
                <h3 className="font-semibold mb-2">Gaming & Enthusiasts</h3>
                <p className="text-sm text-muted-foreground">
                  High-performance systems for gaming and professional
                  applications
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <Card className="glass-card text-center">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Technology Experience?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover how Pirex Computers can provide the perfect technology
                solution tailored to your specific needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-gold hover:bg-gold/90 text-white">
                    <Phone className="h-4 w-4 mr-2" />
                    Get in Touch Today
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Explore Our Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
