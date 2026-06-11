import { Search, ShoppingBag, User, Phone } from "lucide-react";
import { useCart } from "../../lib/cart";
import logo from "../../assets/logo.jpeg";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Plants" },
  { to: "/shop", label: "Pots & Care" },
  { to: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const { count } = useCart();
  const path = window.location.pathname;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a href="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="PotnPlant"
            className="h-12 w-12 rounded-full object-cover"
          />
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-sm md:flex">
          {nav.map((item, index) => {
            const active = path === item.to;

            return (
              <a
                key={`${item.label}-${index}`}
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

          <button type="button" className="hover:text-foreground">
            <Search className="h-4 w-4" />
          </button>

          <a
            href="/admin"
            className="hidden items-center gap-1.5 hover:text-foreground sm:flex"
          >
            <User className="h-4 w-4" />
            Log in
          </a>

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