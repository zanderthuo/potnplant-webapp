import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../../../lib/cart";
import { StoreLayout } from "../../../components/layout/StoreLayout";

export default function CartPage() {
  const { detailed, setQty, remove, subtotal, clear } = useCart();

  const shipping = detailed.length ? 0 : 0;
  const total = subtotal + shipping;

  if (!detailed.length) {
    return (
      <StoreLayout>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-display text-5xl">Your cart is empty</h1>
          <p className="mt-4 text-muted-foreground">
            Fill it with friends from the greenhouse.
          </p>

          <a
            href="/shop"
            className="mt-8 inline-block bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep"
          >
            Browse shop
          </a>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="font-display text-5xl">Shopping cart</h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="hidden grid-cols-[1fr_120px_140px_40px] gap-4 border-b border-border pb-3 text-xs uppercase tracking-widest text-muted-foreground md:grid">
              <span>Product</span>
              <span>Quantity</span>
              <span className="text-right">Total</span>
              <span />
            </div>

            {detailed.map(({ product, qty }) => (
              <div
                key={product.id}
                className="grid grid-cols-[80px_1fr_40px] items-center gap-4 border-b border-border py-6 md:grid-cols-[1fr_120px_140px_40px]"
              >
                <div className="flex items-center gap-4 md:col-span-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 object-cover"
                  />

                  <div>
                    <p className="font-display text-lg">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Ksh. {product.price}.00
                    </p>
                  </div>
                </div>

                <div className="col-span-3 flex items-center border border-border md:col-span-1 md:w-fit">
                  <button
                    type="button"
                    onClick={() => setQty(product.id, qty - 1)}
                    className="grid h-10 w-10 place-items-center hover:bg-muted"
                  >
                    <Minus className="h-3 w-3" />
                  </button>

                  <span className="w-10 text-center text-sm">{qty}</span>

                  <button
                    type="button"
                    onClick={() => setQty(product.id, qty + 1)}
                    className="grid h-10 w-10 place-items-center hover:bg-muted"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                <p className="text-right font-semibold">
                  Ksh. {(product.price * qty).toFixed(2)}
                </p>

                <button
                  type="button"
                  onClick={() => remove(product.id)}
                  className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            <div className="mt-6 flex justify-between">
              <a href="/shop" className="text-sm text-primary hover:underline">
                ← Continue shopping
              </a>

              <button
                type="button"
                onClick={clear}
                className="text-sm text-muted-foreground hover:text-destructive"
              >
                Clear cart
              </button>
            </div>
          </div>

          <aside className="h-fit border border-border bg-card p-8">
            <h2 className="font-display text-2xl">Order summary</h2>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>Ksh. {subtotal.toFixed(2)}</dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>Ksh. {shipping.toFixed(2)}</dd>
              </div>

              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-display text-2xl text-primary">
                  Ksh. {total.toFixed(2)}
                </dd>
              </div>
            </dl>

            <a
              href="/checkout"
              className="mt-6 block w-full bg-primary px-8 py-4 text-center text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep"
            >
              Proceed to checkout
            </a>

            <p className="mt-3 text-xs text-muted-foreground">
              Taxes calculated at checkout.
            </p>
          </aside>
        </div>
      </div>
    </StoreLayout>
  );
}