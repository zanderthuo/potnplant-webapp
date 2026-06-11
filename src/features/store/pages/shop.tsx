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
    return [...products]
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
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <h1 className="font-display text-5xl md:text-6xl">Shop</h1>

          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">
              Home
            </a>
            <ChevronRight className="h-3 w-3" />
            <span>Shop</span>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="space-y-5 border-b border-border pb-6 lg:flex lg:items-center lg:justify-between lg:gap-6 lg:space-y-0">
          <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <div className="flex min-w-max gap-3 pb-1 text-sm lg:flex-wrap lg:gap-6">
              {cats.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 transition lg:rounded-none lg:border-0 lg:px-0 lg:py-0 lg:pb-1 ${
                    cat === category
                      ? "border-primary bg-primary text-primary-foreground lg:border-b-2 lg:bg-transparent lg:font-semibold lg:text-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <select
            value={sort}
            onChange={(event) =>
              handleSortChange(event.target.value as typeof sort)
            }
            className="w-full border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary sm:w-auto"
          >
            <option value="default">Default sorting</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-2xl border border-border bg-card p-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
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
            <div className="mb-6 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
                Page <span className="font-medium text-foreground">{page}</span>{" "}
                of{" "}
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
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
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