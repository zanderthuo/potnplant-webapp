import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  updateProduct,
} from "../api/adminApi";

export type AdminCategory = {
  id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminProduct = {
  id: string;
  name: string;
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
  selectedProduct: AdminProduct | null;

  loading: boolean;
  fetchError: string | null;

  creating: boolean;
  createError: string | null;
  createSuccess: boolean;

  updating: boolean;
  updateError: string | null;

  deleting: boolean;
  deleteError: string | null;
};

const initialState: AdminProductState = {
  products: [],
  selectedProduct: null,

  loading: false,
  fetchError: null,

  creating: false,
  createError: null,
  createSuccess: false,

  updating: false,
  updateError: null,

  deleting: false,
  deleteError: null,
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

export const updateProductThunk = createAsyncThunk<
  ApiResponse<AdminProduct>,
  { id: string; payload: FormData },
  { rejectValue: string }
>(
  "adminProducts/updateProduct",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await updateProduct(id, payload);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const deleteProductThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("adminProducts/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    await deleteProduct(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to delete product"
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

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH ALL
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

      // CREATE
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
      })

      // UPDATE
      .addCase(updateProductThunk.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.updating = false;

        const updatedProduct = action.payload.data;

        state.products = state.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );

        state.selectedProduct = updatedProduct;
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload || "Failed to update product";
      })

      // DELETE
      .addCase(deleteProductThunk.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.deleting = false;

        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.payload || "Failed to delete product";
      });
  },
});

export const {
  resetCreateProductState,
  clearSelectedProduct,
} = adminProductSlice.actions;

export default adminProductSlice.reducer;