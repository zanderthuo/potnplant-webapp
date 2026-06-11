import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products, categories } from "../../../lib/products";
import { ProductCard } from "../../../components/ProductCard";
import { StoreLayout } from "../../../components/layout/StoreLayout";

const PRODUCTS_PER_PAGE = 6;

export default function ShopPage() {
  const [cat, setCat] = useState<string>("All");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">(
    "default"
  );
  const [page, setPage] = useState(1);

  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = useMemo(() => {
    return products
      .filter((product) => cat === "All" || product.category === cat)
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [cat, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));

  const paginatedProducts = filtered.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setCat(category);
    setPage(1);
  };

  const handleSortChange = (value: typeof sort) => {
    setSort(value);
    setPage(1);
  };

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
                onClick={() => handleCategoryChange(category)}
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
            onChange={(event) =>
              handleSortChange(event.target.value as typeof sort)
            }
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
                <li key={category.name}>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(category.name)}
                    className={`flex w-full justify-between border-b border-border/60 pb-3 text-left transition ${
                      cat === category.name
                        ? "font-semibold text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span>({category.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div>
            <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
              <p>
                Showing{" "}
                <span className="font-medium text-foreground">
                  {paginatedProducts.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {filtered.length}
                </span>{" "}
                products
              </p>

              <p>
                Page{" "}
                <span className="font-medium text-foreground">{page}</span> of{" "}
                <span className="font-medium text-foreground">
                  {totalPages}
                </span>
              </p>
            </div>

            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="inline-flex h-10 items-center gap-2 border border-border px-4 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`grid h-10 w-10 place-items-center border text-sm transition ${
                        page === pageNumber
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="inline-flex h-10 items-center gap-2 border border-border px-4 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}