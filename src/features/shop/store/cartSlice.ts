import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  items: Record<string, number>;
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items[productId] = (state.items[productId] || 0) + 1;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },

    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;