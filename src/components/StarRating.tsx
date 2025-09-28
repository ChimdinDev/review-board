// components/StarRating.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';


interface StarProps {
  filled: boolean;
  halfFilled?: boolean;
  size?: number;
}

interface StarRatingProps {
  rating: number;
  size?: number;
}


export const Star: React.FC<StarProps> = ({ filled, halfFilled, size = 20 }) => {
  const getStarColor = () => {
    if (filled || halfFilled) {
      return colors.warning[500];
    }
    return colors.neutral[300];
  };

  return (
    <View style={[styles.starContainer, { width: size, height: size }]}>
      <View style={[styles.starBackground, { backgroundColor: colors.neutral[300] }]} />
      <View
        style={[
          styles.starForeground,
          {
            backgroundColor: getStarColor(),
            width: halfFilled ? '50%' : '100%',
          },
        ]}
      />
      {/* Star icon would be implemented here - using simple rectangles for demo */}
      <View style={[styles.starOutline, { borderColor: getStarColor() }]} />
    </View>
  );
};

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 20 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= fullStars}
          halfFilled={star === fullStars + 1 && hasHalfStar}
          size={size}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 2,
  },
  starContainer: {
    position: 'relative',
  },
  starBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 1,
  },
  starForeground: {
    position: 'absolute',
    height: '100%',
    borderRadius: 1,
  },
  starOutline: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 1,
  },
});