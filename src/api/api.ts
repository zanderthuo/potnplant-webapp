import axios from "axios";

export const api = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL || "https://potnplant-backend.onrender.com",
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});