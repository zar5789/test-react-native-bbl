import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Products: undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ProductDetail: { productId: number };
};

// Lets useNavigation() know every route without passing generics around
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
