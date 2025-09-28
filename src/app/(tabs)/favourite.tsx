// app/favorites.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/src/constants/colors';
import { CompanyCard } from '@/src/components/CompanyCard';
import { getFavorites, removeFavorite } from '@/src/services/favouriteStorage';
import { FavoriteCompany, LoadingState } from '@/src/types';

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteCompany[]>([]);
  const [loading, setLoading] = useState<LoadingState>('loading');
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading('loading');
      setError(null);
      
      const favoriteCompanies = await getFavorites();
      setFavorites(favoriteCompanies);
      setLoading('success');
    } catch (err: any) {
      console.error('Error loading favorites:', err);
      setError(err.message || 'An error occurred while loading favorites');
      setLoading('error');
    }
  };

  const handleToggleFavorite = async (companyId: string) => {
    try {
      await removeFavorite(companyId);
      // Reload favorites after removal
      await loadFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleCompanyPress = (company: FavoriteCompany) => {
    router.push({
      pathname: "/companies/[domain]",
      params: { domain: company.domain },
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  const renderCompanyItem = ({ item }: { item: FavoriteCompany }) => (
    <CompanyCard
      company={{
        ...item,

        isFavorite: true, // Always true since it's from favorites
      }}
      onPress={handleCompanyPress}
      onToggleFavorite={handleToggleFavorite}
    />
  );

  const renderEmptyState = () => {
    if (loading === 'loading') {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
          <Text style={styles.emptyStateText}>Loading favorites...</Text>
        </View>
      );
    }

    if (loading === 'error') {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>Error Loading Favorites</Text>
          <Text style={styles.emptyStateText}>
            {error || 'An error occurred while loading your favorites'}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateTitle}>No favorites yet</Text>
        <Text style={styles.emptyStateText}>
          Companies you add to favorites will appear here
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorite Companies</Text>
        <Text style={styles.subtitle}>
          {favorites.length} {favorites.length === 1 ? 'company' : 'companies'} saved
        </Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderCompanyItem}
        keyExtractor={(item) => item.company_id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary[500]]}
            tintColor={colors.primary[500]}
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});