import { Search } from "lucide-react";

import type { Product } from "../lib/products";
import { getImageUrl } from "../lib/image";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../features/shop/store/cartSlice";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const productUrl = `/product/${product.id}`;

  const price = Number(product.price);
  const oldPrice = product.oldPrice ? Number(product.oldPrice) : null;

  const formatPrice = (value: number) =>
    value.toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleAddToCart = () => {
    dispatch(addToCart(product.id));
  };

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
            src={getImageUrl(product.image)}
            alt={product.name}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </a>

        <div className="absolute right-3 top-3 z-20 flex flex-col gap-2 opacity-100 md:translate-x-12 md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-x-0 md:group-hover:opacity-100">
          <a
            href={productUrl}
            className="grid h-10 w-10 place-items-center bg-card text-foreground shadow-sm hover:text-primary"
            aria-label={`View ${product.name}`}
          >
            <Search className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute inset-x-0 bottom-0 z-20 translate-y-0 bg-primary py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-transform duration-300 hover:bg-leaf-deep md:translate-y-full md:group-hover:translate-y-0"
        >
          Add to cart
        </button>
      </div>

      <div className="mt-5 text-center">
        <a href={productUrl} className="font-display text-lg hover:text-primary">
          {product.name}
        </a>

        <div className="mt-1 flex items-center justify-center gap-2 text-sm">
          {oldPrice !== null && oldPrice > price && (
            <span className="text-muted-foreground line-through">
              Ksh. {formatPrice(oldPrice)}
            </span>
          )}

          <span className="font-semibold">Ksh. {formatPrice(price)}</span>
        </div>
      </div>
    </div>
  );
}