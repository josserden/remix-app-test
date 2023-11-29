import { Product, ProductsResponse } from "~/types/types";

const BASE_URL = "https://dummyjson.com";

export const getProducts = async (): Promise<ProductsResponse> => {
  const data: Response = await fetch(`${BASE_URL}/products`);

  if (!data.ok) {
    throw new Error("Error fetching products");
  }

  return data.json();
};

export const getProduct = async (
  productId: string | undefined,
): Promise<Product> => {
  const data: Response = await fetch(`${BASE_URL}/products/${productId}`);

  if (!data.ok) {
    throw new Error("Error fetching product");
  }

  return data.json();
};
