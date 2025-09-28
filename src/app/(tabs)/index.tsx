// screens/CompanyListScreen.tsx
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/src/constants/colors';
import { CompanyCard } from '@/src/components/CompanyCard';
import { SearchBar } from '@/src/components/SearchBar';

import { getFavorites, removeFavorite, saveFavorite } from '@/src/services/favouriteStorage';
import { queryCompanies } from '@/src/api/apiSetup';
import { Company, LoadingState, FavoriteCompany } from '@/src/types';
import { router } from 'expo-router';


const DEBOUNCE_DELAY = 500;

export default function CompanyListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [totalCompanies, setTotalCompanies] = useState(0);

  // Load favorites on component mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoriteCompanies = await getFavorites();
      const favoriteIds = new Set(favoriteCompanies.map(fav => fav.company_id));
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const searchCompanies = useCallback(async (query: string) => {
    if (!query.trim()) {
      setCompanies([]);
      setHasSearched(false);
      setLoading('idle');
      return;
    }

    setLoading('loading');
    setError(null);

    try {
      const response = await queryCompanies(query);

      if (response.status === 'OK') {
        const companiesWithFavorites = response.data.companies.map(company => ({
          ...company,
          isFavorite: favorites.has(company.company_id),
        }));

        setCompanies(companiesWithFavorites);
        setTotalCompanies(response.data.total_companies);
        setHasSearched(true);
        setLoading('success');
      } else {
        throw new Error('Failed to fetch companies');
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred while searching');
      setLoading('error');
      setCompanies([]);
    }
  }, [favorites]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchCompanies(searchQuery);
      } else {
        setCompanies([]);
        setHasSearched(false);
        setLoading('idle');
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchCompanies]);

  const handleToggleFavorite = async (companyId: string) => {
    try {
      const company = companies.find(c => c.company_id === companyId);
      if (!company) return;

      if (favorites.has(companyId)) {
        await removeFavorite(companyId);
        setFavorites(prev => {
          const newFavorites = new Set(prev);
          newFavorites.delete(companyId);
          return newFavorites;
        });
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
        setFavorites(prev => new Set(prev).add(companyId));
      }

      // Update local companies state
      setCompanies(prevCompanies =>
        prevCompanies.map(c =>
          c.company_id === companyId
            ? { ...c, isFavorite: !c.isFavorite }
            : c
        )
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleCompanyPress = (company: Company) => {
    console.log('Navigate to company details:', company.name);
    router.push({
      pathname: "/companies/[domain]",
      params: { domain: company.domain },
    });

  };

  const onRefresh = async () => {
    if (!searchQuery.trim()) return;

    setRefreshing(true);
    await searchCompanies(searchQuery);
    setRefreshing(false);
  };

  const renderCompanyItem = ({ item }: { item: Company }) => (
    <CompanyCard
      company={item}
      onPress={handleCompanyPress}
      onToggleFavorite={handleToggleFavorite}
    />
  );

  const renderEmptyState = () => {
    if (loading === 'loading') {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={colors.primary[500]} />
          <Text style={styles.emptyStateText}>Searching for companies...</Text>
        </View>
      );
    }

    if (loading === 'error') {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>Search Error</Text>
          <Text style={styles.emptyStateText}>
            {error || 'An error occurred while searching'}
          </Text>
        </View>
      );
    }

    if (hasSearched && companies.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No companies found</Text>
          <Text style={styles.emptyStateText}>
            {searchQuery
              ? `No results for "${searchQuery}"`
              : 'Try searching for a company name'}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateTitle}>Search Companies</Text>
        <Text style={styles.emptyStateText}>
          Enter a company name to search for reviews and ratings
        </Text>
      </View>
    );
  };

  const renderHeader = () => {
    if (hasSearched && companies.length > 0) {
      return (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {totalCompanies.toLocaleString()} companies found
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search companies by name, industry, or location..."
      />

      <FlatList
        data={companies}
        renderItem={renderCompanyItem}
        keyExtractor={(item) => item.company_id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary[500]]}
            tintColor={colors.primary[500]}
          />
        }
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultsCount: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
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