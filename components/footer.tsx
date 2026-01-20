import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  products: [
    { name: "Laptops", href: "/shop?category=laptops" },
    { name: "Desktops", href: "/shop?category=desktops" },
    { name: "Printers", href: "/shop?category=printers" },
    { name: "Projectors", href: "/shop?category=projectors" },
    { name: "Software", href: "/shop?category=software" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Partners", href: "#" },
    { name: "Technical Services", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#contact" },
  ],
  support: [
    { name: "Technical Support", href: "#" },
    { name: "LAN/WAN Setup", href: "#" },
    { name: "Hardware Repairs", href: "#" },
    { name: "Warranty Service", href: "#" },
    { name: "Service Agreements", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center">
              <div className="bg-white rounded-md px-2 py-1">
                <Image
                  src="/images/pirex-logo.png"
                  alt="Pirex Computers"
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs leading-relaxed">
              Your trusted partner for total ICT solutions since 2004. Authorized reseller for leading international hardware manufacturers.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-gold" />
                <span>sales@pirex.co.zw</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-gold" />
                <span>+263 24 2794 334 / 255491</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-gold" />
                <span>Trident Business Centre, Cnr 3rd Street & Central Avenue, Harare</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Products
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Support
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Legal
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Pirex Computers. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-muted-foreground hover:text-gold transition-colors"
              >
                <social.icon className="w-5 h-5" />
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
