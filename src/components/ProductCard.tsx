import { Heart, Search, Repeat } from "lucide-react";
import type { Product } from "../lib/products";
import { useCart } from "../lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  const productUrl = `/product/${product.slug}`;

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.tag && (
          <span
            className={`absolute left-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full text-[10px] font-bold tracking-wider text-white ${
              product.tag === "HOT"
                ? "bg-accent text-accent-foreground"
                : product.tag === "NEW"
                  ? "bg-primary"
                  : "bg-destructive"
            }`}
          >
            {product.tag}
          </span>
        )}

        <a href={productUrl} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </a>

        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 md:translate-x-12 md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-x-0 md:group-hover:opacity-100">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center bg-card text-foreground shadow-sm hover:text-primary"
          >
            <Heart className="h-4 w-4" />
          </button>

          <a
            href={productUrl}
            className="grid h-10 w-10 place-items-center bg-card text-foreground shadow-sm hover:text-primary"
          >
            <Search className="h-4 w-4" />
          </a>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center bg-card text-foreground shadow-sm hover:text-primary"
          >
            <Repeat className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => add(product.id)}
          className="absolute inset-x-0 bottom-0 translate-y-0 bg-primary py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-transform duration-300 md:translate-y-full md:group-hover:translate-y-0"
        >
          Add to cart
        </button>
      </div>

      <div className="mt-5 text-center">
        <a href={productUrl} className="font-display text-lg hover:text-primary">
          {product.name}
        </a>

        <div className="mt-1 flex items-center justify-center gap-2 text-sm">
          {product.compareAt && (
            <span className="text-muted-foreground line-through">
              Ksh. {product.compareAt}.00
            </span>
          )}

          <span className="font-semibold">Ksh. {product.price}.00</span>
        </div>
      </div>
    </div>
  );
}