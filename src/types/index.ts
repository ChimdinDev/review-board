export interface CompanyCategory {
  id: string;
  name: string;
}

export interface Company {
  company_id: string;
  name: string;
  domain: string;
  review_count: number;
  trust_score: number;
  rating: number;
  categories: CompanyCategory[];
  website: string;
  phone?: string;
  email?: string;
  logo?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface CompanySearchData {
  companies: Company[];
  total_companies: number;
}

export interface CompanySearchResponse {
  status: string;
  request_id: string;
  parameters: {
    query: string;
    locale: string;
    min_rating: string;
    min_review_count: string;
    page: string;
  };
  data: CompanySearchData;
}

// Company Reviews API Response Types
export interface Review {
  review_id: string;
  review_title: string;
  review_text: string;
  review_rating: number;
  review_is_verified: boolean;
  review_is_pending: boolean;
  review_likes: number;
  review_language: string;
  review_time: string;
  review_experienced_time: string;
  reply_text?: string;
  consumer_id: string;
  consumer_name: string;
  consumer_image?: string;
  consumer_review_count: number;
  consumer_country: string;
  consumer_is_verified: boolean;
  consumer_review_count_same_domain: number;
}

export interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface ReviewLanguageDistribution {
  [language: string]: number;
}

export interface CompanyReviewsData {
  reviews: Review[];
  total_reviews: number;
  rating_distribution: RatingDistribution;
  review_language_distribution: ReviewLanguageDistribution;
}

export interface CompanyReviewsResponse {
  status: string;
  request_id: string;
  parameters: {
    company_domain: string;
    locale: string;
    date_posted: string;
    page: string;
  };
  data: CompanyReviewsData;
}

// App-specific types
export interface FavoriteCompany {
  company_id: string;
  name: string;
  domain: string;
  rating: number;
  review_count: number;
  trust_score: number;
  website: string;
  categories: CompanyCategory[];
  dateAdded: string; 
}


export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}


export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Search state
export interface SearchState {
  query: string;
  results: Company[];
  loading: LoadingState;
  error: string | null;
  hasSearched: boolean;
}

// Company details state
export interface CompanyDetailsState {
  company: Company | null;
  reviews: Review[];
  reviewsData: CompanyReviewsData | null;
  loading: LoadingState;
  error: string | null;
}

// Favorites state
export interface FavoritesState {
  favorites: FavoriteCompany[];
  loading: LoadingState;
  error: string | null;
}

// Navigation types for Expo Router
export interface CompanyDetailsParams {
  domain: string;
}

// Utility types
export type RatingLevel = 1 | 2 | 3 | 4 | 5;

export interface RatingInfo {
  level: RatingLevel;
  color: string;
  label: string;
}