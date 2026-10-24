import { Product } from '../types/product';

// Set in .env. Expo inlines EXPO_PUBLIC_* variables at build time.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

async function request<T>(path: string): Promise<T> {
  if (!BASE_URL) {
    throw new Error('EXPO_PUBLIC_API_URL is not set in .env');
  }

  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  // The API answers an unknown id with an empty body instead of a 404
  const text = await response.text();
  if (!text) {
    throw new Error('Not found');
  }
  return JSON.parse(text) as T;
}

export function fetchProducts() {
  return request<Product[]>('/products');
}

export function fetchProductById(id: number) {
  return request<Product>(`/products/${id}`);
}
