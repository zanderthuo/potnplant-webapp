import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, ArrowLeft, FileText } from "lucide-react";
import logo from "../../../assets/logo.jpeg";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/content", label: "Site content", icon: FileText },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
        <div className="flex items-center gap-2 border-b border-border px-6 py-5">
           <img
            src={logo}
            alt="PotnPlant"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="font-display text-lg tracking-[0.2em]">ADMIN</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                  active ? "bg-primary/10 font-semibold text-primary" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                }`}
              >
                <n.icon className="h-4 w-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-4">
          <Link to="/" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent">
            <ArrowLeft className="h-4 w-4" /> Back to store
          </Link>
          <button className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent">
            <Settings className="h-4 w-4" /> Settings
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
