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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#062d19] text-white">
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#4caf50]/15 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#f4b400]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div className="md:max-w-sm">
          <div className="flex items-center gap-3">
            <div className="h-20 w-20 overflow-hidden rounded-full">
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
            Empowering all people to be plant people — a small studio providing
            greenery, potted plants, plant care, and gardening services for
            homes, offices, and events.
          </p>

          <p className="mt-6 text-sm text-white/80">
            <span className="text-[#f4b400]">hotline: </span>
            <a
              href="tel:+254143513999"
              className="font-medium text-white hover:text-[#f4b400]"
            >
              (+254) 143 513 999
            </a>
          </p>

          <div className="mt-6 flex items-center gap-4 text-white/60">
            <a href="#" aria-label="Instagram" className="hover:text-[#f4b400]">
              <Instagram className="h-4 w-4" />
            </a>

            <a href="#" aria-label="Facebook" className="hover:text-[#f4b400]">
              <Facebook className="h-4 w-4" />
            </a>

            <a href="#" aria-label="Twitter" className="hover:text-[#f4b400]">
              <Twitter className="h-4 w-4" />
            </a>

            <a href="#" aria-label="Youtube" className="hover:text-[#f4b400]">
              <Youtube className="h-4 w-4" />
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
        © {currentYear} PotnPlant | Made with ❤️ by{" "}
        <a
          href="https://craftzander-website.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#f4b400] hover:text-white"
        >
          craftzander
        </a>
      </div>
    </footer>
  );
}