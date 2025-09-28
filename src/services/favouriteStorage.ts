// services/favoritesStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteCompany } from '../types';


const FAVORITES_KEY = 'favorite_companies';

export async function getFavorites(): Promise<FavoriteCompany[]> {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
}

export async function saveFavorite(company: FavoriteCompany): Promise<void> {
  try {
    const favorites = await getFavorites();
    const existingIndex = favorites.findIndex(fav => fav.company_id === company.company_id);
    
    if (existingIndex === -1) {
      favorites.push(company);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error saving favorite:', error);
    throw error;
  }
}

export async function removeFavorite(companyId: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    const filteredFavorites = favorites.filter(fav => fav.company_id !== companyId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filteredFavorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
}

export async function isFavorite(companyId: string): Promise<boolean> {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.company_id === companyId);
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
}