import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const footerLinks = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    {
      name: "Privacy Policy",
      href: "https://www.termsfeed.com/live/7b2b15df-de07-457f-9a42-33c53affd050",
    },
    {
      name: "Terms of Service",
      href: "https://www.termsfeed.com/live/74a60d14-c007-4076-9708-539e78342757",
    },
    {
      name: "Cookie Policy",
      href: "https://www.termsfeed.com/live/49e90232-078a-464d-b757-0f77ff267a7e",
    },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/pirexcomputers.co.zw",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/pirexcomputers",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/pirex-computers-zw",
  },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-border bg-secondary/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* About Pirex */}
          <div className="col-span-2 md:col-span-1">
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
              Your trusted partner for total ICT solutions since 2004.
              Authorized reseller for leading international hardware
              manufacturers.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contact
            </h4>
            <div className="mt-4 space-y-3">
              <div className="text-sm text-muted-foreground">
                <span>sales@pirexcomputers.co.zw</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span>+263 24 2794 334 / 255491</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span>
                  Trident Business Centre, Cnr 3rd Street & Central Avenue,
                  Harare
                </span>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Pages
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.pages.map((link) => (
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
                    {...(link.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
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
            &copy; {new Date().getFullYear()} Pirex Computers. All rights
            reserved.
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
  );
}
