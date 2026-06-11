import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { products, categories } from "../../../lib/products";
import { ProductCard } from "../../../components/ProductCard";
import { StoreLayout } from "../../../components/layout/StoreLayout";

export default function ShopPage() {
  const [cat, setCat] = useState<string>("All");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">(
    "default"
  );

  const filtered = products
    .filter((product) => cat === "All" || product.category === cat)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <StoreLayout>
      <div className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h1 className="font-display text-6xl">Shop</h1>

          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">
              Home
            </a>
            <ChevronRight className="h-3 w-3" />
            <span>Shop</span>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border pb-6">
          <div className="flex flex-wrap gap-6 text-sm">
            {cats.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setCat(category)}
                className={`pb-1 transition ${
                  cat === category
                    ? "border-b-2 border-primary font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as typeof sort)}
            className="border border-border bg-card px-4 py-2 text-sm"
          >
            <option value="default">Default sorting</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside>
            <h3 className="font-display text-2xl">Categories</h3>

            <ul className="mt-6 space-y-3 text-sm">
              {categories.map((category) => (
                <li
                  key={category.name}
                  className="flex justify-between border-b border-border/60 pb-3 text-muted-foreground hover:text-foreground"
                >
                  <span>{category.name}</span>
                  <span>({category.count})</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}