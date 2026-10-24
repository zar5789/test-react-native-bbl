import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Product } from '../types/product';

type FavoritesState = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
};

// Global favorites list, saved to AsyncStorage so it survives app restarts
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (product) =>
        set((state) =>
          state.favorites.some((p) => p.id === product.id)
            ? { favorites: state.favorites.filter((p) => p.id !== product.id) }
            : { favorites: [...state.favorites, product] },
        ),
      removeFavorite: (id) =>
        set((state) => ({ favorites: state.favorites.filter((p) => p.id !== id) })),
    }),
    {
      name: 'favorites',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useIsFavorite = (id: number) =>
  useFavoritesStore((state) => state.favorites.some((p) => p.id === id));
