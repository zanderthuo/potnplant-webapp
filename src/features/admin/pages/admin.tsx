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
  { to: "/admin/content", label: "Site Content", icon: FileText },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f8f1]">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-[#062d19] text-white shadow-lg md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-hidden border-r border-white/10 bg-[#062d19] text-white shadow-2xl transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#2f7d32]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#f4b400]/10 blur-3xl" />

        <div className="relative flex h-[74px] items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="PotnPlant"
              className="h-10 w-10 rounded-full border border-white/20 object-cover"
            />

            <div>
              <p className="font-display text-lg tracking-[0.2em] text-white">
                ADMIN
              </p>

              <p className="text-xs text-white/50">
                PotnPlant Dashboard
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-md text-white/70 hover:bg-white/10 hover:text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="relative flex-1 space-y-2 overflow-y-auto p-4">
          {nav.map((item) => {
            const active = item.exact
              ? pathname === item.to
              : pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                  active
                    ? "bg-[#2f7d32]/25 text-white shadow-lg backdrop-blur border border-[#2f7d32]/30"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    active ? "text-[#f4b400]" : ""
                  }`}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="relative border-t border-white/10 p-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>
        </div>
      </aside>

      <main className="min-h-screen overflow-x-auto pt-16 md:ml-64 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}