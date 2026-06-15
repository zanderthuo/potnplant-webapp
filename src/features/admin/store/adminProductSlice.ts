import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, getAdminProducts } from "../api/adminApi";

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string | number;
  oldPrice: string | number | null;
  image: string;
  gallery: string[] | null;
  stock: number;
  tag: "HOT" | "NEW" | "SALE" | null;
  isActive: boolean;
  category: AdminCategory;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type AdminProductState = {
  products: AdminProduct[];

  loading: boolean;
  fetchError: string | null;

  creating: boolean;
  createError: string | null;
  createSuccess: boolean;
};

const initialState: AdminProductState = {
  products: [],

  loading: false,
  fetchError: null,

  creating: false,
  createError: null,
  createSuccess: false,
};

export const fetchAdminProductsThunk = createAsyncThunk<
  ApiResponse<AdminProduct[]>,
  void,
  { rejectValue: string }
>("adminProducts/fetchAdminProducts", async (_, { rejectWithValue }) => {
  try {
    return await getAdminProducts();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch products"
    );
  }
});

export const createProductThunk = createAsyncThunk<
  ApiResponse<AdminProduct>,
  FormData,
  { rejectValue: string }
>("adminProducts/createProduct", async (payload, { rejectWithValue }) => {
  try {
    return await createProduct(payload);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to create product"
    );
  }
});

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    resetCreateProductState: (state) => {
      state.creating = false;
      state.createError = null;
      state.createSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProductsThunk.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchAdminProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data || [];
      })
      .addCase(fetchAdminProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.fetchError = action.payload || "Failed to fetch products";
      })

      .addCase(createProductThunk.pending, (state) => {
        state.creating = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.creating = false;
        state.createSuccess = true;

        if (action.payload?.data) {
          state.products.unshift(action.payload.data);
        }
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload || "Failed to create product";
      });
  },
});

export const { resetCreateProductState } = adminProductSlice.actions;

export default adminProductSlice.reducer;