import { api } from "../../../api/api";
import type { Product } from "../../../lib/products";

type ApiCategory = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type ApiProductResponse = Omit<Product, "category"> & {
  category: ApiCategory | string;
};

function mapApiProduct(product: ApiProductResponse): Product {
  return {
    ...product,
    category:
      typeof product.category === "string"
        ? product.category
        : product.category.name,
  };
}

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<ApiResponse<ApiProductResponse[]>>(
    "/api/public/products"
  );

  return response.data.data.map(mapApiProduct);
}

export async function getProductById(id: string): Promise<Product> {
  const response = await api.get<ApiResponse<ApiProductResponse>>(
    `/api/public/products/${id}`
  );

  return mapApiProduct(response.data.data);
}