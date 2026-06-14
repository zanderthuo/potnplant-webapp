import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  items: Record<string, number>;
};

const CART_KEY = "potnplant.cart";

const loadCart = (): Record<string, number> => {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const saveCart = (items: Record<string, number>) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

const initialState: CartState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items[productId] = (state.items[productId] || 0) + 1;
      saveCart(state.items);
    },

    setCartQty: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        delete state.items[productId];
      } else {
        state.items[productId] = quantity;
      }

      saveCart(state.items);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = {};
      localStorage.removeItem(CART_KEY);
    },
  },
});

export const { addToCart, setCartQty, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;