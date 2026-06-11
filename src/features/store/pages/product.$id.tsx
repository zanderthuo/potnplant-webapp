import { ChevronRight, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { findProduct, products } from "../../../lib/products";
import { useCart } from "../../../lib/cart";
import { ProductCard } from "../../../components/ProductCard";
import { StoreLayout } from "../../../components/layout/StoreLayout";

function getProductSlugFromUrl() {
  const parts = window.location.pathname.split("/");
  return parts[parts.length - 1];
}

export default function ProductPage() {
  const slug = getProductSlugFromUrl();
  const product = findProduct(slug);

  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <StoreLayout>
        <div className="mx-auto max-w-3xl p-20 text-center">
          <h1 className="font-display text-4xl">Plant not found</h1>

          <a href="/shop" className="mt-6 inline-block text-primary underline">
            Back to shop
          </a>
        </div>
      </StoreLayout>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

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
            src={product.image}
            alt={product.name}
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="eyebrow">{product.category}</p>

          <h1 className="mt-3 font-display text-5xl">{product.name}</h1>

          <p className="mt-2 text-sm italic text-muted-foreground">
            {product.latin}
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            {product.compareAt && (
              <span className="text-xl text-muted-foreground line-through">
                Ksh. {product.compareAt}.00
              </span>
            )}

            <span className="font-display text-4xl text-primary">
              Ksh. {product.price}.00
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

            <button
              type="button"
              className="grid h-12 w-12 place-items-center border border-border hover:text-primary"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>

          <dl className="mt-12 space-y-2 border-t border-border pt-6 text-sm">
            <div className="flex gap-3">
              <dt className="w-32 text-muted-foreground">SKU</dt>
              <dd>PNP-{product.id.padStart(4, "0")}</dd>
            </div>

            <div className="flex gap-3">
              <dt className="w-32 text-muted-foreground">Category</dt>
              <dd>{product.category}</dd>
            </div>

            <div className="flex gap-3">
              <dt className="w-32 text-muted-foreground">In stock</dt>
              <dd>{product.stock} units</dd>
            </div>
          </dl>
        </div>
      </div>

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
    </StoreLayout>
  );
}