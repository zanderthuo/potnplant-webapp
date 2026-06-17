import { api } from "../../../api/api";

export type CreateProductPayload = FormData;
export type UpdateProductPayload = FormData;

function getAuthHeaders() {
  const accessToken = localStorage.getItem("accessToken");

  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function createProduct(payload: CreateProductPayload) {
  const response = await api.post("/api/admin/products", payload, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function updateProduct(id: string, payload: UpdateProductPayload) {
  const response = await api.patch(`/api/admin/products/${id}`, payload, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function deleteProduct(id: string) {
  const response = await api.delete(`/api/admin/products/${id}`, {
    headers: getAuthHeaders(),
  });

  return response.data;
}

export async function getAdminProducts() {
  const response = await api.get("/api/public/products");

  return response.data;
}

export async function getAdminCategories() {
  const response = await api.get("/api/admin/categories", {
    headers: getAuthHeaders(),
  });

  return response.data;
}