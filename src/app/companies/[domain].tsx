// app/companies/[domain].tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  RefreshControl,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/src/constants/colors';
import { FavoriteButton } from '@/src/components/FavoriteButton';
import { fetchCompanyReviews, queryCompanies } from '@/src/api/apiSetup';
import { StarRating } from '@/src/components/StarRating';
import { getFavorites, removeFavorite, saveFavorite } from '@/src/services/favouriteStorage';
import { Review, Company, FavoriteCompany } from '@/src/types';

export default function CompanyDetailsScreen() {
  const { domain } = useLocalSearchParams<{ domain: string }>();
  const router = useRouter();

  const [company, setCompany] = useState<Company | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (domain) {
      loadCompanyData();
    }
  }, [domain]);

  const loadCompanyData = async () => {
    try {
      setLoading(true);
      
      // Search for company and get first result
      const searchResponse = await queryCompanies(domain as string);
      
      if (searchResponse.status === 'OK' && searchResponse.data.companies.length > 0) {
        const foundCompany = searchResponse.data.companies[0];
        setCompany(foundCompany);
        
        // Load reviews
        const reviewsResponse = await fetchCompanyReviews(foundCompany.domain);
        setReviews(reviewsResponse.data.reviews);
        
        // Check if favorite
        const favorites = await getFavorites();
        setIsFavorite(favorites.some(fav => fav.company_id === foundCompany.company_id));
      }
    } catch (error) {
      console.error('Error loading company data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!company) return;
    
    try {
      if (isFavorite) {
        await removeFavorite(company.company_id);
      } else {
        const favoriteCompany: FavoriteCompany = {
          company_id: company.company_id,
          name: company.name,
          domain: company.domain,
          rating: company.rating,
          review_count: company.review_count,
          trust_score: company.trust_score,
          website: company.website,
          categories: company.categories,
          dateAdded: new Date().toISOString(),
        };
        await saveFavorite(favoriteCompany);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCompanyData();
    setRefreshing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
          <Text style={styles.loadingText}>Loading company details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!company) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Company not found</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.consumerInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.consumer_name.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.consumerName}>{item.consumer_name}</Text>
                  <Text style={styles.reviewMeta}>
                    {formatDate(item.review_time)} • {item.consumer_country}
                  </Text>
                </View>
              </View>
              <StarRating rating={item.review_rating} size={16} />
            </View>

            <Text style={styles.reviewText}>{item.review_text}</Text>

            {item.reply_text && (
              <View style={styles.replyContainer}>
                <Text style={styles.replyText}>{item.reply_text}</Text>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.review_id}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.companyHeader}>
              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>{company.name}</Text>
                <Text style={styles.domain}>{company.domain}</Text>
                <View style={styles.ratingContainer}>
                  <StarRating rating={company.rating} />
                  <Text style={styles.ratingText}>
                    {company.rating} • {company.review_count} reviews
                  </Text>
                </View>
              </View>
              <FavoriteButton
                isFavorite={isFavorite}
                onPress={handleToggleFavorite}
              />
            </View>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary[500]]}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    color: colors.text.secondary,
  },
  errorText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.text.inverse,
    fontWeight: '600',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  domain: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingText: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: colors.card,
    margin: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  consumerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary[600],
  },
  consumerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  reviewMeta: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  reviewText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
  replyContainer: {
    backgroundColor: colors.neutral[50],
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary[300],
  },
  replyText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
});