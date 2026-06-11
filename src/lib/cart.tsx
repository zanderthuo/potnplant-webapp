import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

type CartItem = { productId: string; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: Array<CartItem & { product: Product }>;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "potn-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && typeof window !== "undefined") {
      localStorage.setItem(KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const add: CartCtx["add"] = (id, qty = 1) =>
    setItems((prev) => {
      const exists = prev.find((i) => i.productId === id);
      if (exists) return prev.map((i) => (i.productId === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { productId: id, qty }];
    });
  const remove: CartCtx["remove"] = (id) =>
    setItems((prev) => prev.filter((i) => i.productId !== id));
  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.productId !== id)
        : prev.map((i) => (i.productId === id ? { ...i, qty } : i)),
    );
  const clear = () => setItems([]);

  const detailed = items
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.productId)! }))
    .filter((i) => i.product);
  const count = items.reduce((a, b) => a + b.qty, 0);
  const subtotal = detailed.reduce((a, b) => a + b.product.price * b.qty, 0);

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal, detailed }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
};
