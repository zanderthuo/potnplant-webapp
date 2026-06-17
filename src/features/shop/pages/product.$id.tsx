import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { ProductCard } from "../../../components/ProductCard";
import { StoreLayout } from "../../../components/layout/StoreLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProduct, fetchProducts } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";
import { getImageUrl } from "../../../lib/image";

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const { id: productId } = useParams<{ id: string }>();

  const {
    item: product,
    items,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }

    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, productId, items.length]);

  useEffect(() => {
    setQty(1);
  }, [productId]);

  const related = useMemo(() => {
    if (!product?.id) return [];

    return items.filter((item) => item.id !== product.id).slice(0, 4);
  }, [items, product]);

  const formatPrice = (value: string | number) => {
    return Number(value).toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleAddToCart = () => {
    if (!product?.id) return;

    for (let i = 0; i < qty; i += 1) {
      dispatch(addToCart(product.id));
    }

    toast.success(`${qty} ${qty === 1 ? "item" : "items"} added to cart.`);
  };

  if (loading) {
    return (
      <StoreLayout>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-muted-foreground">Loading plant details...</p>
        </div>
      </StoreLayout>
    );
  }

  if (error || !product?.id) {
    return (
      <StoreLayout>
        <div className="mx-auto max-w-3xl p-20 text-center">
          <h1 className="font-display text-4xl">
            {error ? "An error occurred" : "Plant not found"}
          </h1>

          {error && <p className="mt-2 text-muted-foreground">{error}</p>}

          <a href="/shop" className="mt-6 inline-block text-primary underline">
            Back to shop
          </a>
        </div>
      </StoreLayout>
    );
  }

  const price = Number(product.price);
  const oldPrice = product.oldPrice ? Number(product.oldPrice) : null;

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
        <div className="overflow-hidden bg-muted">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.src =
                "https://placehold.co/1000x1000?text=No+Image";
            }}
          />
        </div>

        <div>
          <p className="eyebrow">{product.category}</p>

          <h1 className="mt-3 font-display text-5xl">{product.name}</h1>

          <div className="mt-6 flex items-baseline gap-3">
            {oldPrice !== null && oldPrice > price && (
              <span className="text-xl text-muted-foreground line-through">
                Ksh. {formatPrice(oldPrice)}
              </span>
            )}

            <span className="font-display text-4xl text-primary">
              Ksh. {formatPrice(price)}
            </span>
          </div>

          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-border">
              <button
                type="button"
                onClick={() => setQty((current) => Math.max(1, current - 1))}
                className="grid h-12 w-12 place-items-center hover:bg-muted"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </button>

              <span className="w-12 text-center text-sm">{qty}</span>

              <button
                type="button"
                onClick={() => setQty((current) => current + 1)}
                className="grid h-12 w-12 place-items-center hover:bg-muted"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
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
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </StoreLayout>
  );
}