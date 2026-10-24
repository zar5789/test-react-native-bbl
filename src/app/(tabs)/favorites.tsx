import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import StateView from '../../components/StateView';
import { useFavoritesStore } from '../../store/favoritesStore';
import { colors } from '../../theme';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  return (
    <View style={styles.container}>
      <Header title="Favorites" />
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            right={
              <Pressable
                onPress={() => removeFavorite(item.id)}
                hitSlop={8}
                style={styles.remove}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${item.title} from favorites`}
              >
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            }
          />
        )}
        contentContainerStyle={[styles.list, favorites.length === 0 && styles.emptyList]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <StateView
            message="No favorites yet. Open a product and tap “Add to Favorites”."
            actionLabel="Browse products"
            onAction={() => navigation.navigate('Tabs', { screen: 'Products' })}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
  },
  emptyList: {
    flexGrow: 1,
  },
  separator: {
    height: 12,
  },
  remove: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.favorite,
  },
  removeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.favorite,
  },
});
