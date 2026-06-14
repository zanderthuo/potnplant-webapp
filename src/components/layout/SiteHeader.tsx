import {
  ChevronDown,
  LogOut,
  Menu,
  Phone,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../features/auth/store/authSlice";
import logo from "../../assets/logo.jpeg";

const nav = [
  { to: "/#home", label: "Home" },
  { to: "/#services", label: "Services" },
  { to: "/#products", label: "Products" },
  { to: "/#contact", label: "Contact Us" },
  { to: "/shop", label: "Shop" },
];

export function SiteHeader() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);

  const count = Object.values(cartItems).reduce(
    (total, qty) => total + qty,
    0
  );

  const isAdmin =
    isAuthenticated &&
    (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN");

  const displayName = user?.fullName || user?.email || "User";

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

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <a href="/#home" className="flex items-center">
          <div className="h-20 w-20 overflow-hidden rounded-full">
            <img
              src={logo}
              alt="PotnPlant"
              className="h-full w-full object-cover"
            />
          </div>
        </a>

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

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="hidden items-center gap-2 lg:flex">
            <Phone className="h-3.5 w-3.5" />
            <span className="text-foreground">(+254) 143 513 999</span>
          </span>

          {isAdmin && (
            <a
              href="/admin"
              className="hidden rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground transition hover:bg-primary hover:text-primary-foreground lg:inline-flex"
            >
              Admin
            </a>
          )}

          {isAuthenticated ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setUserMenuOpen((current) => !current)}
                className="flex items-center gap-2 text-foreground hover:text-primary"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </span>

                <span className="max-w-[120px] truncate text-sm font-medium">
                  {displayName}
                </span>

                <ChevronDown className="h-4 w-4" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-11 z-50 w-48 rounded-lg border border-border bg-card p-2 shadow-lg">
                  <div className="border-b border-border px-3 py-2">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {displayName}
                    </p>
                    {user?.email && (
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="hidden items-center gap-2 text-foreground hover:text-primary sm:flex"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-muted">
                <User className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">Sign in</span>
            </a>
          )}

          <a
            href="/cart"
            className="relative flex items-center gap-1.5 hover:text-foreground"
          >
            <ShoppingBag className="h-5 w-5" />

            <span className="absolute -right-3 -top-2 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
              {count}
            </span>
          </a>

          <button
            type="button"
            className="lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

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

            {isAdmin && (
              <a
                href="/admin"
                onClick={closeMenu}
                className="mt-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                Admin
              </a>
            )}

            {isAuthenticated ? (
              <div className="mt-2 rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                    <User className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {displayName}
                    </p>
                    {user?.email && (
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-3 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/login"
                onClick={closeMenu}
                className="mt-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-foreground hover:bg-muted"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </span>
                <span>Sign in</span>
              </a>
            )}

            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(+254) 788 727 645</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}