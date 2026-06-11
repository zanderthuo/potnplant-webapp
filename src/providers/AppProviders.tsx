import type { ReactNode } from "react";
import { ContentProvider } from "../lib/content";
import { CartProvider } from "../lib/cart";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ContentProvider>
      <CartProvider>{children}</CartProvider>
    </ContentProvider>
  );
}