// components/FavoriteButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
}


interface HeartIconProps {
  filled: boolean;
  size?: number;
  color?: string;
}

export const HeartIcon: React.FC<HeartIconProps> = ({ filled, size = 24, color = '#ef4444' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.heart,
          {
            backgroundColor: filled ? color : 'transparent',
            borderColor: color,
            borderWidth: filled ? 0 : 2,
          },
        ]}
      />
    </View>
  );
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onPress,
  size = 24,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isFavorite ? colors.error[50] : colors.neutral[100],
          width: size + 16,
          height: size + 16,
        },
      ]}
      onPress={onPress}
      hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
    >
      <HeartIcon filled={isFavorite} size={size} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    width: '70%',
    height: '70%',
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
});