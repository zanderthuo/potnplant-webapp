import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../api/authApi";
import type { LoginPayload, LoginResponse } from "../api/authApi";

type AuthState = {
  user: LoginResponse["user"] | null;
  accessToken: string | null;
  loggingIn: boolean;
  loginError: string | null;
  loginSuccess: boolean;
  isAuthenticated: boolean;
};

const storedUser = localStorage.getItem("user");
const storedAccessToken = localStorage.getItem("accessToken");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  accessToken: storedAccessToken,
  loggingIn: false,
  loginError: null,
  loginSuccess: false,
  isAuthenticated: Boolean(storedAccessToken),
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      return await login(payload);
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to login"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.loggingIn = false;
      state.loginError = null;
      state.loginSuccess = false;
    },

    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");

      state.user = null;
      state.accessToken = null;
      state.loggingIn = false;
      state.loginError = null;
      state.loginSuccess = false;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loggingIn = true;
        state.loginError = null;
        state.loginSuccess = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loggingIn = false;
        state.loginSuccess = true;

        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);

      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loggingIn = false;
        state.loginError =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to login";
      });
  },
});

export const { resetLoginState, logout } = authSlice.actions;

export default authSlice.reducer;