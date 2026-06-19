import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  if (typeof category === "string") return category;
  return category.name;
}

export default function ShopPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();

  const [cat, setCat] = useState<string>(
    searchParams.get("category") || "All"
  );
  const [sort, setSort] = useState<SortType>("default");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "All";
    setCat(categoryFromUrl);
    setPage(1);
  }, [searchParams]);

  const products = useMemo<Product[]>(() => {
    return (items as ProductWithApiCategory[]).map((product) => ({
      ...product,
      category: getCategoryName(product.category) as Product["category"],
    }));
  }, [items]);

  const cats = useMemo<string[]>(() => {
    const productCategories = products.map((product) => product.category);
    return ["All", ...Array.from(new Set(productCategories))];
  }, [products]);

  const categoryCounts = useMemo(() => {
    const dynamicCategories = cats
      .filter((category) => category !== "All")
      .map((category) => ({
        name: category,
        count: products.filter((product) => product.category === category)
          .length,
      }));

    if (dynamicCategories.length > 0) {
      return dynamicCategories;
    }

    return categories.map((category) => ({
      ...category,
      count: products.filter((product) => product.category === category.name)
        .length,
    }));
  }, [cats, products]);

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

    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const handleSortChange = (value: SortType) => {
    setSort(value);
    setPage(1);
  };

  if (loading) {
    return (
      <StoreLayout>
        <section className="min-h-[60vh] bg-gradient-to-b from-[#e2f3df] via-[#edf8eb] to-[#f7fcf6] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </section>
      </StoreLayout>
    );
  }

  if (error) {
    return (
      <StoreLayout>
        <section className="min-h-[60vh] bg-gradient-to-b from-[#e2f3df] via-[#edf8eb] to-[#f7fcf6] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-destructive">{error}</p>
          </div>
        </section>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#d8eed8] via-[#eaf7e8] to-[#f7fcf6]">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#2f7d32]/15 blur-3xl" />
        <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-[#f4b400]/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            PotnPlant Store
          </p>

          <h1 className="mt-3 font-display text-5xl text-[#0f4f2b] md:text-6xl">
            Shop
          </h1>

          <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#2f7d32] via-[#8bcf7a] to-[#f4b400]" />

          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary">
              Home
            </a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#0f4f2b]">Shop</span>
            {cat !== "All" && (
              <>
                <ChevronRight className="h-3 w-3" />
                <span className="text-[#0f4f2b]">{cat}</span>
              </>
            )}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#e2f3df] via-[#edf8eb] to-[#f7fcf6] px-4 py-8 md:px-6 md:py-10">
        <div className="absolute -left-40 top-40 h-80 w-80 rounded-full bg-[#2f7d32]/15 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-[#f4b400]/12 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="space-y-5 border-b border-[#2f7d32]/15 pb-6 lg:flex lg:items-center lg:justify-between lg:gap-6 lg:space-y-0">
            <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
              <div className="flex min-w-max gap-3 pb-1 text-sm lg:flex-wrap lg:gap-6">
                {cats.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 transition lg:rounded-none lg:border-0 lg:px-0 lg:py-0 lg:pb-1 ${
                      cat === category
                        ? "border-primary bg-primary text-primary-foreground lg:border-b-2 lg:bg-transparent lg:font-semibold lg:text-[#0f4f2b]"
                        : "border-[#2f7d32]/20 bg-white/60 text-muted-foreground hover:border-primary hover:text-primary lg:bg-transparent"
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
                handleSortChange(event.target.value as SortType)
              }
              className="w-full rounded-md border border-[#2f7d32]/20 bg-white/80 px-4 py-3 text-sm outline-none backdrop-blur focus:border-primary sm:w-auto"
            >
              <option value="default">Default sorting</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>

          <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[240px_1fr]">
            <aside className="rounded-2xl border border-[#2f7d32]/15 bg-white/75 p-5 shadow-sm backdrop-blur lg:bg-white/50">
              <h3 className="font-display text-2xl text-[#0f4f2b]">
                Categories
              </h3>

              <ul className="mt-6 space-y-3 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange("All")}
                    className={`flex w-full justify-between border-b border-[#2f7d32]/15 pb-3 text-left transition ${
                      cat === "All"
                        ? "font-semibold text-primary"
                        : "text-muted-foreground hover:text-[#0f4f2b]"
                    }`}
                  >
                    <span>All</span>
                    <span>({products.length})</span>
                  </button>
                </li>

                {categoryCounts.map((category) => (
                  <li key={category.name}>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(category.name)}
                      className={`flex w-full justify-between border-b border-[#2f7d32]/15 pb-3 text-left transition ${
                        cat === category.name
                          ? "font-semibold text-primary"
                          : "text-muted-foreground hover:text-[#0f4f2b]"
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
              <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-[#2f7d32]/15 bg-white/60 px-5 py-4 text-sm text-muted-foreground shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Showing{" "}
                  <span className="font-medium text-[#0f4f2b]">
                    {paginatedProducts.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-[#0f4f2b]">
                    {filtered.length}
                  </span>{" "}
                  products
                </p>

                <p>
                  Page{" "}
                  <span className="font-medium text-[#0f4f2b]">{page}</span>{" "}
                  of{" "}
                  <span className="font-medium text-[#0f4f2b]">
                    {totalPages}
                  </span>
                </p>
              </div>

              {paginatedProducts.length > 0 ? (
                <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-[#2f7d32]/15 bg-white/60 p-8 text-center text-sm text-muted-foreground">
                  No products found in this category.
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="inline-flex h-10 items-center gap-2 border border-primary/20 bg-white/70 px-4 text-sm text-[#0f4f2b] backdrop-blur disabled:cursor-not-allowed disabled:opacity-40 hover:bg-primary/10"
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
                            : "border-primary/20 bg-white/70 text-[#0f4f2b] hover:bg-primary/10"
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
                    className="inline-flex h-10 items-center gap-2 border border-primary/20 bg-white/70 px-4 text-sm text-[#0f4f2b] backdrop-blur disabled:cursor-not-allowed disabled:opacity-40 hover:bg-primary/10"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </StoreLayout>
  );
}