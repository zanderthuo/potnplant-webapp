import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://potnplant-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});