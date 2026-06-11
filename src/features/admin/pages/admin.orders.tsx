import { useState } from "react";

type Status = "Pending" | "Paid" | "Shipped" | "Delivered" | "Refunded";

const ORDERS: {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: Status;
  date: string;
  items: number;
}[] = [
  { id: "#PNP-2049", customer: "Maya Linden", email: "maya@hey.com", total: 154, status: "Paid", date: "Jun 3, 2026", items: 2 },
  { id: "#PNP-2048", customer: "Noah Chen", email: "noah@studio.co", total: 79, status: "Shipped", date: "Jun 3, 2026", items: 1 },
  { id: "#PNP-2047", customer: "Lila Park", email: "lila@plantpost.com", total: 246, status: "Pending", date: "Jun 2, 2026", items: 4 },
  { id: "#PNP-2046", customer: "Marcus Vale", email: "m.vale@gmail.com", total: 38, status: "Paid", date: "Jun 2, 2026", items: 1 },
  { id: "#PNP-2045", customer: "Sana Iqbal", email: "sana@iqbal.io", total: 110, status: "Delivered", date: "Jun 1, 2026", items: 2 },
  { id: "#PNP-2044", customer: "Theo Ramos", email: "theo@ramos.studio", total: 64, status: "Refunded", date: "May 30, 2026", items: 1 },
];

const statusFilters: Array<Status | "All"> = [
  "All",
  "Pending",
  "Paid",
  "Shipped",
  "Delivered",
  "Refunded",
];

export default function OrdersAdmin() {
  const [filter, setFilter] = useState<Status | "All">("All");

  const rows = filter === "All" ? ORDERS : ORDERS.filter((order) => order.status === filter);

  return (
    <div className="p-8">
      <header>
        <p className="eyebrow">Sales</p>
        <h1 className="mt-1 font-display text-4xl">Orders</h1>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {statusFilters.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
              filter === status
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-3 font-normal">Order</th>
              <th className="px-4 py-3 font-normal">Customer</th>
              <th className="px-4 py-3 font-normal">Date</th>
              <th className="px-4 py-3 font-normal">Items</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 text-right font-normal">Total</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((order) => (
              <tr key={order.id} className="border-t border-border hover:bg-muted/40">
                <td className="px-4 py-3 font-medium">{order.id}</td>

                <td className="px-4 py-3">
                  <p>{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.email}</p>
                </td>

                <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                <td className="px-4 py-3">{order.items}</td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      order.status === "Paid" || order.status === "Delivered"
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

                <td className="px-4 py-3 text-right font-semibold">Ksh. {order.total}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}