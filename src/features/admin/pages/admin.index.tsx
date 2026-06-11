import {
  ArrowUpRight,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
} from "lucide-react";
import { products } from "../../../lib/products";

const orders = [
  { id: "#PNP-2049", customer: "Maya Linden", total: 154, status: "Paid", date: "Jun 3, 2026" },
  { id: "#PNP-2048", customer: "Noah Chen", total: 79, status: "Shipped", date: "Jun 3, 2026" },
  { id: "#PNP-2047", customer: "Lila Park", total: 246, status: "Pending", date: "Jun 2, 2026" },
  { id: "#PNP-2046", customer: "Marcus Vale", total: 38, status: "Paid", date: "Jun 2, 2026" },
  { id: "#PNP-2045", customer: "Sana Iqbal", total: 110, status: "Refunded", date: "Jun 1, 2026" },
];

export default function DashboardAdmin() {
  const stats = [
    { label: "Revenue (30d)", value: "Ksh. 24,318", delta: "+12.4%", icon: DollarSign },
    { label: "Orders", value: "342", delta: "+5.1%", icon: ShoppingBag },
    { label: "Customers", value: "1,284", delta: "+2.8%", icon: Users },
    {
      label: "Products in stock",
      value: products.reduce((total, product) => total + product.stock, 0).toString(),
      delta: "—",
      icon: Package,
    },
  ];

  return (
    <div className="p-8">
      <header className="flex items-end justify-between">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="mt-1 font-display text-4xl">Dashboard</h1>
        </div>

        <p className="text-sm text-muted-foreground">Welcome back, Admin 🌿</p>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>

                <span className="flex items-center gap-1 text-xs font-medium text-primary">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.delta}
                </span>
              </div>

              <p className="mt-6 font-display text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Recent orders</h2>
            <button type="button" className="text-xs uppercase tracking-widest text-primary">
              View all
            </button>
          </div>

          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="pb-3 font-normal">Order</th>
                <th className="pb-3 font-normal">Customer</th>
                <th className="pb-3 font-normal">Date</th>
                <th className="pb-3 font-normal">Status</th>
                <th className="pb-3 text-right font-normal">Total</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-border">
                  <td className="py-3 font-medium">{order.id}</td>
                  <td className="py-3">{order.customer}</td>
                  <td className="py-3 text-muted-foreground">{order.date}</td>

                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        order.status === "Paid"
                          ? "bg-primary/10 text-primary"
                          : order.status === "Shipped"
                            ? "bg-accent/30 text-accent-foreground"
                            : order.status === "Pending"
                              ? "bg-muted text-foreground"
                              : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-3 text-right font-semibold">Ksh. {order.total}.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-2xl">Top sellers</h2>

          <ul className="mt-4 space-y-4">
            {products.slice(0, 5).map((product) => (
              <li key={product.id} className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-12 w-12 rounded object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>

                <span className="font-display text-lg">Ksh. {product.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}