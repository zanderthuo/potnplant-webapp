import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "../../assets/logo.jpeg";

const navigation = [
  { to: "/#home", label: "Home" },
  { to: "/#services", label: "Services" },
  { to: "/#products", label: "Plants" },
  { to: "/shop", label: "Shop" },
  { to: "/#contact", label: "Contact Us" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div className="md:max-w-sm">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="PotnPlant"
              className="h-12 w-12 rounded-full object-cover"
            />

            <span className="font-display text-2xl tracking-[0.24em]">
              POTNPLANT
            </span>
          </div>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Empowering all people to be plant people — a small studio providing
            greenery, potted plants, plant care, and gardening services for
            homes, offices, and events.
          </p>

          <p className="mt-6 text-sm">
            <span className="text-primary">hotline: </span>
            <a
              href="tel:+254700000000"
              className="font-medium hover:text-primary"
            >
              (+254) 788 727 645
            </a>
          </p>

          <div className="mt-6 flex items-center gap-4 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-foreground">
              <Instagram className="h-4 w-4" />
            </a>

            <a href="#" aria-label="Facebook" className="hover:text-foreground">
              <Facebook className="h-4 w-4" />
            </a>

            <a href="#" aria-label="Twitter" className="hover:text-foreground">
              <Twitter className="h-4 w-4" />
            </a>

            <a href="#" aria-label="Youtube" className="hover:text-foreground">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="md:justify-self-center">
          <h4 className="text-sm font-semibold">Information</h4>

          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {[
              { label: "About Us", href: "/#home" },
              { label: "Our Services", href: "/#services" },
              { label: "Plant Care", href: "/#services" },
              { label: "Contact", href: "/#contact" },
              { label: "Shop Plants", href: "/shop" },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:justify-self-end md:text-left">
          <h4 className="text-sm font-semibold">Quick Links</h4>

          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {navigation.map((item) => (
              <li key={item.label}>
                <a href={item.to} className="transition hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-foreground py-5 text-center text-xs text-background/80">
        Copyright © 2026 PotnPlant — All Rights Reserved
      </div>
    </footer>
  );
}