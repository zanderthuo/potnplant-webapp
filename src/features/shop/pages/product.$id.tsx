import { useEffect, useState, useMemo } from "react";
import { ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";
import { useParams } from "react-router-dom";
import { useCart } from "../../../lib/cart";
import { ProductCard } from "../../../components/ProductCard";
import { StoreLayout } from "../../../components/layout/StoreLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProduct, fetchProducts } from "../store/productsSlice";
import { getImageUrl } from "../../../lib/image";

export default function ProductPage() {
  const dispatch = useAppDispatch();

  // Hook up your framework's native parameter hook to reliably extract the ID
  // This matches the $id variable name from your filename: product.$id.tsx
  const { id: productId } = useParams<{ id: string }>();

  const { item: product, items, loading, error } = useAppSelector((state) => state.products);
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, productId, items.length]);

  const related = useMemo(() => {
    // Check if product is fully loaded and has an ID
    if (!product || !("id" in product)) return [];
    return items.filter((p) => p.id !== product.id).slice(0, 4);
  }, [items, product]);

  if (loading) {
    return (
      <StoreLayout>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-muted-foreground">Loading plant details...</p>
        </div>
      </StoreLayout>
    );
  }

  // Robust check ensuring product is not null, not an empty object, and has properties
  if (error || !product || Object.keys(product).length === 0 || !("id" in product)) {
    return (
      <StoreLayout>
        <div className="mx-auto max-w-3xl p-20 text-center">
          <h1 className="font-display text-4xl">
            {error ? "An error occurred" : "Plant not found"}
          </h1>
          <p className="mt-2 text-muted-foreground">{error}</p>
          <a href="/shop" className="mt-6 inline-block text-primary underline">
            Back to shop
          </a>
        </div>
      </StoreLayout>
    );
  }


  return (
    <StoreLayout>
      <div className="bg-secondary/60">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-6 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">
            Home
          </a>
          <ChevronRight className="h-3 w-3" />
          <a href="/shop" className="hover:text-foreground">
            Shop
          </a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-16 md:grid-cols-2">
        <div className="bg-muted">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="eyebrow">{product.category}</p>

          <h1 className="mt-3 font-display text-5xl">{product.name}</h1>

          <div className="mt-6 flex items-baseline gap-3">
            {product.oldPrice && (
              <span className="text-xl text-muted-foreground line-through">
                Ksh. {parseFloat(product.oldPrice as unknown as string).toLocaleString()}.00
              </span>
            )}

            <span className="font-display text-4xl text-primary">
              Ksh. {parseFloat(product.price as unknown as string).toLocaleString()}.00
            </span>
          </div>

          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="grid h-12 w-12 place-items-center hover:bg-muted"
              >
                <Minus className="h-3 w-3" />
              </button>

              <span className="w-12 text-center text-sm">{qty}</span>

              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="grid h-12 w-12 place-items-center hover:bg-muted"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => add(product.id, qty)}
              className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </button>

          </div>

          <dl className="mt-12 space-y-2 border-t border-border pt-6 text-sm">
            <div className="flex gap-3">
              <dt className="w-32 text-muted-foreground">Category</dt>
              <dd>{product.category}</dd>
            </div>

          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto max-w-7xl px-6 pb-16">
          <h2 className="text-center font-display text-3xl">
            You may also like
          </h2>

          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </StoreLayout>
  );
}