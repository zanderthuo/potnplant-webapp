import {
  useEffect,
  useMemo,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { MessageCircle } from "lucide-react";

import { StoreLayout } from "../../../components/layout/StoreLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts } from "../store/productsSlice";
import { getImageUrl } from "../../../lib/image";

const WHATSAPP_NUMBER = "254143513999";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const { items: products, loading } = useAppSelector(
    (state) => state.products
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const detailed = useMemo(() => {
  return Object.entries(cartItems)
    .map(([productId, qty]) => {
      const product = products.find(
        (item) => String(item.id) === String(productId)
      );

      if (!product) return null;

      return {
        product,
        qty,
      };
    })
    .filter(Boolean) as {
    product: (typeof products)[number];
    qty: number;
  }[];
}, [cartItems, products]);

  const subtotal = detailed.reduce(
    (total, item) => total + Number(item.product.price) * item.qty,
    0
  );

  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const canCheckout =
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    location.trim().length > 0;

  const createWhatsAppMessage = () => {
    const productLines = detailed
      .map(({ product, qty }) => {
        return `- ${product.name} x${qty} = Ksh. ${(
          Number(product.price) * qty
        ).toFixed(2)}`;
      })
      .join("\n");

    return `Hello, I would like to place an order.

Customer Details:
Name: ${name}
Phone: ${phone}
Delivery Location: ${location}

Products:
${productLines}

Subtotal: Ksh. ${subtotal.toFixed(2)}
Shipping: Ksh. ${shipping.toFixed(2)}
Tax: Ksh. ${tax.toFixed(2)}
Total: Ksh. ${total.toFixed(2)}

Additional Notes:
${notes || "None"}

Please confirm availability and delivery details.`;
  };

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    createWhatsAppMessage()
  )}`;

  if (loading) {
    return (
      <StoreLayout>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="font-display text-5xl">Loading checkout...</h1>
        </div>
      </StoreLayout>
    );
  }

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
              <Field
                label="Full name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />

              <Field
                label="Phone number"
                name="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />

              <Field
                label="Delivery location"
                name="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
              />
            </Section>

            <Section title="Order Instructions">
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">
                  Additional notes
                </span>

                <textarea
                  name="notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
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
                      src={getImageUrl(product.image)}
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
                      Ksh. {Number(product.price).toFixed(2)}
                    </p>
                  </div>

                  <p className="text-sm font-semibold">
                    Ksh. {(Number(product.price) * qty).toFixed(2)}
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

            {canCheckout ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-leaf-deep"
              >
                <MessageCircle className="h-4 w-4" />
                Place order using WhatsApp
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="mt-6 inline-flex w-full cursor-not-allowed items-center justify-center gap-3 bg-muted px-8 py-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                Fill details to continue
              </button>
            )}

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