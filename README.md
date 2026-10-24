# Test React Native – BBL

A small product catalogue app built for the React Native technical test. It lists products from
[Fake Store API](https://fakestoreapi.com), shows a detail page per product, and keeps a global
favorites list.

## Features

- **Product list:** `FlatList` with image, title and price, plus pull-to-refresh
- **Product detail:** loaded from `GET /products/{id}`
- **Favorites:** add or remove from the detail screen, browse them in the Favorites tab (with a count badge), remove them from the list
- **Persistence:** favorites are saved to AsyncStorage and stay after the app is closed
- **Animation:** the heart "pops" when an item is favorited
- Loading, error (with retry) and empty states on every screen

## Tech stack

- Expo SDK 58 · React Native 0.88 · TypeScript
- React Navigation 7: a native stack (Tabs → Product Detail) with bottom tabs (Products, Favorites)
- Zustand with the `persist` middleware for global favorites state, backed by AsyncStorage

## Getting started

Requirements: Node.js 20+ and either the **Expo Go** app on a phone, an Android emulator or an iOS simulator.

```bash
npm install
npm start
```

The API base URL comes from `EXPO_PUBLIC_API_URL` in `.env`.

Then scan the QR code with Expo Go, or press `a` for Android, `i` for iOS or `w` for web.

Type check:

```bash
npx tsc --noEmit
```

## Project structure

```
App.tsx                  Providers, root SafeAreaView, NavigationContainer
src/
  api/products.ts        Fake Store API calls (base URL from EXPO_PUBLIC_API_URL)
  hooks/useProducts.ts   useProducts (list + refresh) and useProduct (single item)
  store/favoritesStore.ts Zustand store persisted to AsyncStorage
  navigation/            Root stack + bottom tabs, typed route params
  screens/               ProductList, ProductDetail, Favorites
  components/            Header, ProductCard, FavoriteButton, StateView
  types/product.ts       Product type
```

## Notes

- Safe-area insets are applied once by the root `SafeAreaView`. Each navigator turns off its own
  header and insets, and screens render a simple shared `Header`, so padding is never doubled.
- A favorite stores the whole product object, so the Favorites tab works without another request.
