import { useNavigation } from '@react-navigation/native';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import StateView from '../../components/StateView';
import { useProducts } from '../../hooks/useProducts';
import { colors } from '../../theme';

export default function ProductListScreen() {
  const navigation = useNavigation();
  const { products, loading, refreshing, error, reload, refresh } = useProducts();

  const renderContent = () => {
    if (loading) return <StateView loading />;
    if (error && products.length === 0) {
      return <StateView message={`Could not load products: ${error}`} actionLabel="Retry" onAction={reload} />;
    }

    return (
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.primary} />
        }
        ListEmptyComponent={<StateView message="No products found" />}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Products" />
      {renderContent()}
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
  separator: {
    height: 12,
  },
});
