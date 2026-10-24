import { useCallback, useEffect, useState } from 'react';
import { fetchProductById, fetchProducts } from '../api/products';
import { Product } from '../types/product';

function toMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong';
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (isRefresh: boolean) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      setProducts(await fetchProducts());
    } catch (e) {
      setError(toMessage(e));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  return {
    products,
    loading,
    refreshing,
    error,
    reload: () => load(false),
    refresh: () => load(true),
  };
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProductById(id)
      .then((data) => !cancelled && setProduct(data))
      .catch((e) => !cancelled && setError(toMessage(e)))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [id, attempt]);

  return { product, loading, error, reload: () => setAttempt((n) => n + 1) };
}
