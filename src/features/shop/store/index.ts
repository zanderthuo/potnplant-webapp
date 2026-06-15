import cartReducer from "./cartSlice";
import productReducer from "./productsSlice";

export const storeReducers = {
  cart: cartReducer,
  products: productReducer,
};