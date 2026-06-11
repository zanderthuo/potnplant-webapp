import {
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { MessageCircle } from "lucide-react";
import { useCart } from "../../../lib/cart";
import { StoreLayout } from "../../../components/layout/StoreLayout";

const WHATSAPP_NUMBER = "254719808225"; // replace with your WhatsApp number

export default function CheckoutPage() {
  const { detailed, subtotal } = useCart();

  const shipping = detailed.length ? 0 : 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const createWhatsAppMessage = () => {
    const productLines = detailed
      .map(({ product, qty }) => {
        return `- ${product.name} x${qty} = Ksh. ${(product.price * qty).toFixed(
          2
        )}`;
      })
      .join("\n");

    return `Hello, I would like to place an order.

Products:
${productLines}

Subtotal: Ksh. ${subtotal.toFixed(2)}
Shipping: Ksh. ${shipping.toFixed(2)}
Tax: Ksh. ${tax.toFixed(2)}
Total: Ksh. ${total.toFixed(2)}

Please confirm availability and delivery details.`;
  };

  const placeOrderOnWhatsApp = () => {
    const message = encodeURIComponent(createWhatsAppMessage());
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  if (!detailed.length) {
    return (
      <StoreLayout>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-display text-5xl">Nothing to check out</h1>

          <p className="mt-4 text-muted-foreground">
            Add a plant to your cart first.
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
        <h1 className="font-display text-5xl">Checkout</h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
          <div className="space-y-10">
            <Section title="Contact Information">
              <Field label="Full name" name="name" required />
              <Field label="Phone number" name="phone" type="tel" required />
              <Field label="Delivery location" name="location" required />
            </Section>

            <Section title="Order Instructions">
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
                  Additional notes
                </span>

                <textarea
                  name="notes"
                  rows={5}
                  placeholder="Example: Deliver to Westlands, call before delivery..."
                  className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </label>
            </Section>
          </div>

          <aside className="h-fit border border-border bg-card p-8">
            <h2 className="font-display text-2xl">Your order</h2>

            <ul className="mt-6 space-y-4">
              {detailed.map(({ product, qty }) => (
                <li key={product.id} className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-cover"
                    />

                    <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-foreground text-[10px] text-background">
                      {qty}
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className="font-display text-base">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Ksh. {product.price}.00
                    </p>
                  </div>

                  <p className="text-sm font-semibold">
                    Ksh. {(product.price * qty).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
              <Row label="Subtotal" value={`Ksh. ${subtotal.toFixed(2)}`} />
              <Row label="Shipping" value={`Ksh. ${shipping.toFixed(2)}`} />
              <Row label="Tax" value={`Ksh. ${tax.toFixed(2)}`} />

              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-display text-2xl text-primary">
                  Ksh. {total.toFixed(2)}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={placeOrderOnWhatsApp}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep"
            >
              <MessageCircle className="h-4 w-4" />
              Place order using WhatsApp
            </button>

            <a
              href="/cart"
              className="mt-4 block text-center text-sm text-primary hover:underline"
            >
              ← Back to cart
            </a>
          </aside>
        </div>
      </div>
    </StoreLayout>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>

      <input
        {...props}
        className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}