import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { TabParamList } from '../../navigation/types';
import { useFavoritesStore } from '../../store/favoritesStore';
import { colors } from '../../theme';
import FavoritesScreen from './favorites';
import ProductListScreen from './products';

const Tab = createBottomTabNavigator<TabParamList>();

// Insets are handled once by the SafeAreaView in the root layout
const NO_INSETS = { top: 0, bottom: 0, left: 0, right: 0 };

function TabIcon({ icon, color }: { icon: string; color: string }) {
  return <Text style={{ fontSize: 20, color }}>{icon}</Text>;
}

export default function TabsLayout() {
  const favoriteCount = useFavoritesStore((state) => state.favorites.length);

  return (
    <Tab.Navigator
      safeAreaInsets={NO_INSETS}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductListScreen}
        options={{ tabBarIcon: ({ color }) => <TabIcon icon="☰" color={color} /> }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="♥" color={color} />,
          tabBarBadge: favoriteCount > 0 ? favoriteCount : undefined,
        }}
      />
    </Tab.Navigator>
  );
}
