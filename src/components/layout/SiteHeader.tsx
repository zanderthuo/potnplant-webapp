import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../lib/cart";
import logo from "../../assets/logo.jpeg";

const nav = [
  { to: "/#home", label: "Home" },
  { to: "/#services", label: "Services" },
  { to: "/#categories", label: "Categories" },
  { to: "/#products", label: "Plants" },
  { to: "/#contact", label: "Contact Us" },
  { to: "/shop", label: "Shop" },
];

export function SiteHeader() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  const currentUrl = `${currentPath}${currentHash}`;

  const isActive = (to: string) => {
    if (to === "/#home") {
      return (
        currentPath === "/" &&
        (currentHash === "" || currentHash === "#home")
      );
    }

    return currentUrl === to || currentPath === to;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        {/* Logo */}
        <a href="/#home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="PotnPlant"
            className="h-12 w-12 rounded-full object-cover"
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden flex-1 items-center justify-center gap-8 text-sm lg:flex">
          {nav.map((item) => {
            const active = isActive(item.to);

            return (
              <a
                key={item.to}
                href={item.to}
                className={`relative pb-1 transition ${
                  active
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}

                {active && (
                  <span className="absolute inset-x-0 -bottom-1 mx-auto h-[2px] w-6 bg-primary" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="hidden items-center gap-2 lg:flex">
            <Phone className="h-3.5 w-3.5" />
            <span className="text-foreground">(+254) 700 000 000</span>
          </span>

          <a
            href="/cart"
            className="relative flex items-center gap-1.5 hover:text-foreground"
          >
            <ShoppingBag className="h-5 w-5" />

            <span className="absolute -right-3 -top-2 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
              {count}
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="flex flex-col px-4 py-4">
            {nav.map((item) => {
              const active = isActive(item.to);

              return (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={closeMenu}
                  className={`rounded-lg px-4 py-3 text-sm transition ${
                    active
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(+254) 700 000 000</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}