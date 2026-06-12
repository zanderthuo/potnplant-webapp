import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ContentProvider } from "./lib/content";
import { CartProvider } from "./lib/cart";

import ShopPage from "./features/shop/pages/shop";
import ProductPage from "./features/shop/pages/product.$id";
import CartPage from "./features/shop/pages/cart";
import CheckoutPage from "./features/shop/pages/checkout";

import AdminLayout from "./features/admin/pages/admin";
import DashboardAdmin from "./features/admin/pages/admin.index";
import AdminProducts from "./features/admin/pages/admin.products";
import AdminOrders from "./features/admin/pages/admin.orders";
import AdminCustomers from "./features/admin/pages/admin.customers";
import AdminContent from "./features/admin/pages/admin.content";
import CreateProductPage from "./features/admin/pages/CreateProductPage";

import HomePage from "./features/shop/pages/homepage";

import LoginPage from "./features/auth/pages/LoginPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";

export default function App() {
  return (
    <ContentProvider>
      <CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            success: {
              style: {
                border: "1px solid #22c55e",
              },
            },
            error: {
              style: {
                border: "1px solid #ef4444",
              },
            },
          }}
        />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardAdmin />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/create" element={<CreateProductPage />} />
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