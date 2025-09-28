// components/CompanyCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../constants/colors';
import { StarRating } from './StarRating';
import { FavoriteButton } from './FavoriteButton';
import { Company } from '../types';

interface CompanyCardProps {
  company: Company;
  onPress: (company: Company) => void;
  onToggleFavorite: (companyId: string) => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onPress,
  onToggleFavorite,
}) => {
  const handleFavoritePress = () => {
    onToggleFavorite(company.company_id);
  };

  const getPrimaryCategory = () => {
    return company.categories.length > 0 ? company.categories[0].name : 'Business';
  };

  const getLocation = () => {
    if (company.city && company.country) {
      return `${company.city}, ${company.country}`;
    }
    return company.country || 'Unknown location';
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(company)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {company.logo ? (
              <Image source={{ uri: company.logo }} style={styles.logo} />
            ) : (
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoText}>
                  {company.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.companyName} numberOfLines={1}>
              {company.name}
            </Text>
            <Text style={styles.industry}>{getPrimaryCategory()}</Text>
            <Text style={styles.domain}>{company.domain}</Text>
          </View>
          
          <FavoriteButton
            isFavorite={company.isFavorite || false}
            onPress={handleFavoritePress}
          />
        </View>

        <Text style={styles.location}>{getLocation()}</Text>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingInfo}>
            <StarRating rating={company.rating} />
            <View style={styles.ratingTextContainer}>
              <Text style={styles.rating}>{company.rating.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>({company.review_count.toLocaleString()})</Text>
            </View>
          </View>
          
          <View style={styles.trustScoreContainer}>
            <Text style={styles.trustScoreLabel}>Trust Score</Text>
            <Text style={styles.trustScore}>{company.trust_score.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardContent: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary[600],
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  industry: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  domain: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  location: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  trustScoreContainer: {
    alignItems: 'flex-end',
  },
  trustScoreLabel: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginBottom: 2,
  },
  trustScore: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary[600],
  },
});