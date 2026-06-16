import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAdminCategories } from "../api/adminApi";

export type AdminCategory = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type AdminCategoryState = {
  categories: AdminCategory[];
  loading: boolean;
  error: string | null;
};

const initialState: AdminCategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchAdminCategoriesThunk = createAsyncThunk(
  "adminCategories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAdminCategories();

      return response?.data ?? response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

const adminCategorySlice = createSlice({
  name: "adminCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAdminCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCategorySlice.reducer;