import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Settings,
  ArrowLeft,
  FileText,
  Menu,
  X,
} from "lucide-react";
import logo from "../../../assets/logo.jpeg";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/content", label: "Site content", icon: FileText },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 grid h-10 w-10 place-items-center rounded-md border border-border bg-card shadow md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-border bg-sidebar transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:flex`}
      >
        <div className="flex h-[73px] items-center justify-between gap-2 border-b border-border px-6">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="PotnPlant"
              className="h-8 w-8 rounded-full object-cover"
            />

            <span className="font-display text-lg tracking-[0.2em]">
              ADMIN
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-md hover:bg-sidebar-accent md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {nav.map((n) => {
            const active = n.exact
              ? pathname === n.to
              : pathname.startsWith(n.to);

            return (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                }`}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to store
          </Link>

          <button className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent">
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </aside>

      <main className="min-h-screen overflow-x-auto pt-16 md:ml-64 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}