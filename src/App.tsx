import { Routes, Route, Navigate } from "react-router-dom";
import { ContentProvider } from "./lib/content";
import { CartProvider } from "./lib/cart";
import ShopPage from "./features/store/pages/shop";
import ProductPage from "./features/store/pages/product.$id";
import CartPage from "./features/store/pages/cart";
import CheckoutPage from "./features/store/pages/checkout";
import AdminLayout from "./features/admin/pages/admin";
import DashboardAdmin from "./features/admin/pages/admin.index";
import AdminProducts from "./features/admin/pages/admin.products";
import AdminOrders from "./features/admin/pages/admin.orders";
import AdminCustomers from "./features/admin/pages/admin.customers";
import AdminContent from "./features/admin/pages/admin.content";
import HomePage from "./features/store/pages/homepage";


export default function App() {
  return (
    <ContentProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="content" element={<AdminContent />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </ContentProvider>
  );
}
