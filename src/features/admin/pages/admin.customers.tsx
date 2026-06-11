const CUSTOMERS = [
  { name: "Maya Linden", email: "maya@hey.com", orders: 8, spent: 642, since: "2024" },
  { name: "Noah Chen", email: "noah@studio.co", orders: 3, spent: 218, since: "2025" },
  { name: "Lila Park", email: "lila@plantpost.com", orders: 12, spent: 1430, since: "2023" },
  { name: "Marcus Vale", email: "m.vale@gmail.com", orders: 2, spent: 76, since: "2026" },
  { name: "Sana Iqbal", email: "sana@iqbal.io", orders: 5, spent: 488, since: "2024" },
];

export default function CustomersAdmin() {
  return (
    <div className="p-8">
      <header>
        <p className="eyebrow">People</p>
        <h1 className="mt-1 font-display text-4xl">Customers</h1>
      </header>

      <div className="mt-6 rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-3 font-normal">Customer</th>
              <th className="px-4 py-3 font-normal">Orders</th>
              <th className="px-4 py-3 font-normal">Total spent</th>
              <th className="px-4 py-3 font-normal">Customer since</th>
            </tr>
          </thead>

          <tbody>
            {CUSTOMERS.map((customer) => (
              <tr key={customer.email} className="border-t border-border hover:bg-muted/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 font-display text-primary">
                      {customer.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </span>

                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">{customer.orders}</td>
                <td className="px-4 py-3 font-semibold">Ksh. {customer.spent}.00</td>
                <td className="px-4 py-3 text-muted-foreground">{customer.since}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}