import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import FavoriteButton from '../../components/FavoriteButton';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import { useProduct } from '../../hooks/useProducts';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ navigation, route }: Props) {
  const { product, loading, error, reload } = useProduct(route.params.productId);

  const renderContent = () => {
    if (loading) return <StateView loading />;
    if (error || !product) {
      return <StateView message={`Could not load product: ${error ?? 'Not found'}`} actionLabel="Retry" onAction={reload} />;
    }

    return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageBox}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        </View>
        <Text style={styles.category}>{product.category.toUpperCase()}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {product.rating && (
            <Text style={styles.rating}>
              ★ {product.rating.rate} ({product.rating.count})
            </Text>
          )}
        </View>
        <FavoriteButton product={product} />
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Product Detail" onBack={navigation.goBack} />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  imageBox: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: colors.card,
  },
  image: {
    width: '100%',
    height: 260,
  },
  category: {
    fontSize: 12,
    letterSpacing: 1,
    color: colors.muted,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
  rating: {
    fontSize: 14,
    color: colors.muted,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
});
