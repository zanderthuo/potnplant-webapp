import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../api/productsApi";
import type { Product } from "../../../lib/products";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type ProductsState = {
  items: Product[];
  item: Product | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  items: [],
  item: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const products: Product[] = await getProducts();

    return products;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to load products"
    );
  }
});

export const fetchProduct = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/fetchProduct", async (id, { rejectWithValue }) => {
  try {
    const products: Product[] = await getProducts();

    const product = products.find(
      (p) => p.id === id
    );

    if (!product) {
      return rejectWithValue("Product not found");
    }

    return product;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to load product"
    );
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.item = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load products";
      })

      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.item = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load product";
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;