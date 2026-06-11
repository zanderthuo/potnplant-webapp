import { useState } from "react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { products as seed, type Product } from "../../../lib/products";

export default function ProductsAdmin() {
  const [items, setItems] = useState<Product[]>(seed);
  const [q, setQ] = useState("");

  const filtered = items.filter((product) =>
    product.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="mt-1 font-display text-4xl">Products</h1>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep"
        >
          <Plus className="h-4 w-4" />
          New product
        </button>
      </header>

      <div className="mt-8 rounded-lg border border-border bg-card">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />

          <input
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-3 font-normal">Product</th>
              <th className="px-4 py-3 font-normal">Category</th>
              <th className="px-4 py-3 font-normal">Stock</th>
              <th className="px-4 py-3 font-normal">Price</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 text-right font-normal">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded object-cover"
                    />

                    <div>
                      <p className="font-medium">{product.name}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3 font-semibold">Ksh. {product.price}.00</td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      product.stock > 10
                        ? "bg-primary/10 text-primary"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {product.stock > 10 ? "Active" : "Low stock"}
                  </span>
                </td>

                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button
                      type="button"
                      className="grid h-8 w-8 place-items-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setItems((current) => current.filter((item) => item.id !== product.id))
                      }
                      className="grid h-8 w-8 place-items-center rounded text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}