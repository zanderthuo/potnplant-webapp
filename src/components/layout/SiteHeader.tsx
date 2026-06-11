import { Phone, ShoppingBag, User } from "lucide-react";
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

  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  const currentUrl = `${currentPath}${currentHash}`;

  const isActive = (to: string) => {
    if (to === "/#home") {
      return currentPath === "/" && (currentHash === "" || currentHash === "#home");
    }

    return currentUrl === to || currentPath === to;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a href="/#home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="PotnPlant"
            className="h-12 w-12 rounded-full object-cover"
          />
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-sm md:flex">
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

        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <span className="hidden items-center gap-2 lg:flex">
            <Phone className="h-3.5 w-3.5" />
            <span className="text-foreground">(+254) 700 000 000</span>
          </span>

          {/* <a
            href="/admin"
            className={`hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition lg:flex ${
              isActive("/admin")
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            <User className="h-4 w-4" />
            Admin
          </a> */}

          <a
            href="/cart"
            className="relative flex items-center gap-1.5 hover:text-foreground"
          >
            <ShoppingBag className="h-4 w-4" />

            <span className="absolute -right-3 -top-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
              {count}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}