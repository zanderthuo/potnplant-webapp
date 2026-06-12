import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "../../../lib/products";
import type { Product } from "../../../lib/products";
import { ProductCard } from "../../../components/ProductCard";
import { StoreLayout } from "../../../components/layout/StoreLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts } from "../store/productsSlice";

const PRODUCTS_PER_PAGE = 6;
type SortType = "default" | "price-asc" | "price-desc";

type ApiCategory =
  | string
  | {
      id: string;
      name: string;
      slug?: string;
      description?: string;
      image?: string;
      isActive?: boolean;
      createdAt?: string;
      updatedAt?: string;
    };

type ProductWithApiCategory = Omit<Product, "category"> & {
  category: ApiCategory;
};

function getCategoryName(category: ApiCategory): string {
  if (typeof category === "string") {
    return category;
  }
  return category.name;
}

export default function ShopPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);

  const [cat, setCat] = useState<string>("All");
  const [sort, setSort] = useState<SortType>("default");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Safely map incoming products to normalize category field as string
  const products = useMemo<Product[]>(() => {
    return (items as ProductWithApiCategory[]).map((product) => ({
      ...product,
      category: getCategoryName(product.category) as Product["category"],
    }));
  }, [items]);

  // Extract unique active categories from the items
  const cats = useMemo<string[]>(() => {
    const productCategories = products.map((product) => product.category);
    return ["All", ...Array.from(new Set(productCategories))];
  }, [products]);

  // Generate category pill details and counts
  const categoryCounts = useMemo(() => {
    const dynamicCategories = cats
      .filter((category) => category !== "All")
      .map((category) => ({
        name: category,
        count: products.filter((product) => product.category === category).length,
      }));

    if (dynamicCategories.length > 0) {
      return dynamicCategories;
    }

    return categories.map((category) => ({
      ...category,
      count: products.filter((product) => product.category === category.name).length,
    }));
  }, [cats, products]);

  // Filter and sort products securely parsing prices to float values
  const filtered = useMemo<Product[]>(() => {
    return [...products]
      .filter((product) => cat === "All" || product.category === cat)
      .sort((a, b) => {
        const priceA = parseFloat(a.price as unknown as string);
        const priceB = parseFloat(b.price as unknown as string);
        if (sort === "price-asc") return priceA - priceB;
        if (sort === "price-desc") return priceB - priceA;
        return 0;
      });
  }, [products, cat, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));

  const paginatedProducts = useMemo<Product[]>(() => {
    return filtered.slice(
      (page - 1) * PRODUCTS_PER_PAGE,
      page * PRODUCTS_PER_PAGE
    );
  }, [filtered, page]);

  const handleCategoryChange = (category: string) => {
    setCat(category);
    setPage(1);
  };

  const handleSortChange = (value: SortType) => {
    setSort(value);
    setPage(1);
  };

  if (loading) {
    return (
      <StoreLayout>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </StoreLayout>
    );
  }

  if (error) {
    return (
      <StoreLayout>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-destructive">{error}</p>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      {/* Hero Header */}
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
        {/* Controls Bar */}
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
            onChange={(event) => handleSortChange(event.target.value as SortType)}
            className="w-full border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary sm:w-auto"
          >
            <option value="default">Default sorting</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        {/* Layout Content */}
        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="rounded-2xl border border-border bg-card p-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
            <h3 className="font-display text-2xl">Categories</h3>
            <ul className="mt-6 space-y-3 text-sm">
              {categoryCounts.map((category) => (
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

          {/* Product Feed Grid */}
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
                of <span className="font-medium text-foreground">{totalPages}</span>
              </p>
            </div>

            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="inline-flex h-10 items-center gap-2 border border-border px-4 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
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
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  className="inline-flex h-10 items-center gap-2 border border-border px-4 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
