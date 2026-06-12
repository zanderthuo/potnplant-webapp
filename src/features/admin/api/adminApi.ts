import { api } from "../../../api/api";

export type CreateProductPayload = FormData;

function getAuthHeaders() {
  const accessToken = localStorage.getItem("accessToken");

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function createProduct(payload: CreateProductPayload) {
  const response = await api.post("/admin/products", payload, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function getAdminProducts() {
  const response = await api.get("/public/products");

  return response.data;
}