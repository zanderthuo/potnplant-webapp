import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import logo from "../../assets/logo-light.png";

const navigation = [
  { to: "/#home", label: "Home" },
  { to: "/#services", label: "Services" },
  { to: "/#products", label: "Plants" },
  { to: "/shop", label: "Shop" },
  { to: "/#contact", label: "Contact Us" },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#062d19] text-white">
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#4caf50]/15 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#f4b400]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div className="md:max-w-sm">
          <div className="flex items-center gap-3">
            <div className="h-15 w-20 overflow-hidden">
              <img
                src={logo}
                alt="PotnPlant"
                className="h-full w-full object-cover"
              />
            </div>

            <span className="font-display text-2xl tracking-[0.24em] text-white">
              POTnPLANT
            </span>
          </div>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
            PotnPlant is your everything garden centre for plants in Kenya. We
            enhance life and beauty of your indoor and outdoor spaces through
            selected plants. At PotnPlant KENYA our services and products are
            tailored to suit your everyday gardening needs.
          </p>

          <p className="mt-6 text-sm text-white/80">
            <span className="text-[#f4b400]">Call/WhatsApp: </span>
            <a
              href="tel:+254143513999"
              className="font-medium text-white hover:text-[#f4b400]"
            >
              (+254) 143 513 999
            </a>
          </p>

          <div className="mt-6 flex items-center gap-4 text-white/60">
            <a
              href="https://www.instagram.com/potnplantke?igsh=Z2VlOWVhOGZmeGFj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#f4b400]"
            >
              <FaInstagram className="h-4 w-4" />
            </a>

            <a
              href="https://facebook.com/potnplantke"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#f4b400]"
            >
              <FaFacebookF className="h-4 w-4" />
            </a>

            <a
              href="https://x.com/potnplantke"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hover:text-[#f4b400]"
            >
              <FaXTwitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="md:justify-self-center">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-[#f4b400]">
            Information
          </h4>

          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {[
              { label: "About Us", href: "/#home" },
              { label: "Our Services", href: "/#services" },
              { label: "Plant Care", href: "/#services" },
              { label: "Contact", href: "/#contact" },
              { label: "Shop Plants", href: "/shop" },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition hover:text-[#f4b400]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:justify-self-end md:text-left">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-[#f4b400]">
            Quick Links
          </h4>

          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {navigation.map((item) => (
              <li key={item.label}>
                <a href={item.to} className="transition hover:text-[#f4b400]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/20 py-5 text-center text-xs text-white/70">
        © {currentYear} PotnPlant
      </div>
    </footer>
  );
}
