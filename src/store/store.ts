import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/shop/store/productsSlice";
import cartReducer from "../features/shop/store/cartSlice";
import adminProductReducer from "../features/admin/store/adminProductSlice";
import authReducer from "../features/auth/store/authSlice";
import adminCategoryReducer from "../features/admin/store/adminCategorySlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    adminProducts: adminProductReducer,
    adminCategories: adminCategoryReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;