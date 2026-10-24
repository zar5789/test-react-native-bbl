import { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Product } from '../types/product';
import { colors } from '../theme';

type Props = {
  product: Product;
  onPress: () => void;
  right?: ReactNode;
};

export default function ProductCard({ product, onPress, right }: Props) {
  // `right` sits outside the Pressable so a button there is not nested inside another button
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.content, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
      </Pressable>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.card,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: 72,
    height: 72,
  },
  info: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 15,
    color: colors.text,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
});
