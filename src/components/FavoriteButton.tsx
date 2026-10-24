import { useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text } from 'react-native';
import { useFavoritesStore, useIsFavorite } from '../store/favoritesStore';
import { Product } from '../types/product';
import { colors } from '../theme';

const useNativeDriver = Platform.OS !== 'web';

export default function FavoriteButton({ product }: { product: Product }) {
  const isFavorite = useIsFavorite(product.id);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Small "pop" when the item is added
    if (!isFavorite) {
      Animated.sequence([
        Animated.spring(scale, { toValue: 1.4, speed: 50, useNativeDriver }),
        Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver }),
      ]).start();
    }
    toggleFavorite(product);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.button, isFavorite && styles.active]}
      accessibilityRole="button"
    >
      <Animated.Text style={[styles.icon, isFavorite && styles.activeText, { transform: [{ scale }] }]}>
        {isFavorite ? '♥' : '♡'}
      </Animated.Text>
      <Text style={[styles.label, isFavorite && styles.activeText]}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.favorite,
    backgroundColor: colors.card,
  },
  active: {
    backgroundColor: colors.favorite,
  },
  icon: {
    fontSize: 22,
    color: colors.favorite,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.favorite,
  },
  activeText: {
    color: '#fff',
  },
});
