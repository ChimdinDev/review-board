# Review Board - Company Reviews Mobile App

A modern, beautifully designed mobile application for searching companies and viewing customer reviews, built with React Native and Expo.
## 📱 Overview

Review Board provides users with a seamless experience to search for companies, view their ratings and reviews, and save favorites for quick access. The app features a clean, material-design inspired interface with real-time search functionality and offline capabilities.

## ✨ Features

### 🔍 Smart Company Search
- Real-time search with debouncing
- Search by company name, industry, or location
- Beautiful company cards displaying ratings and review counts
- Visual star rating system

### 📊 Company Details & Reviews
- Comprehensive company information
- Customer reviews with ratings and dates
- Company response to reviews
- Trust score indicators
- Review verification badges

### ❤️ Favorites Management
- Save companies to favorites with one tap
- Persistent local storage using AsyncStorage
- Quick access to favorite companies
- Offline availability of saved data

### 🎨 Beautiful UI/UX
- Material Design inspired interface
- Modern color palette with primary and secondary themes
- Smooth animations and transitions
- Responsive design for all screen sizes
- Pull-to-refresh functionality

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Storage**: AsyncStorage for local data persistence
- **HTTP Client**: Axios for API communication
- **UI Components**: Custom components with React Native StyleSheet

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd review-board
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Configuration**
Create a `.env` file in the root directory with the following variables:
```env
EXPO_PUBLIC_BASE_URL=your_api_base_url
EXPO_PUBLIC_RAPIDAPI_HOST=your_rapidapi_host
EXPO_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key
```

4. **Start the development server**
```bash
npx expo start
# or
npm start
```

5. **Run on your device**
- Install the Expo Go app on your mobile device
- Scan the QR code from the terminal or Expo Dev Tools

## 🏗 Project Structure

```
review-board/
├── app/                    # Expo Router file-based routing
│   ├── index.tsx          # Company list/search screen
│   ├── favorites.tsx      # Favorites screen
│   └── companies/
│       └── [domain].tsx   # Company details screen (dynamic route)
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── CompanyCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── StarRating.tsx
│   │   └── FavoriteButton.tsx
│   ├── constants/
│   │   └── colors.ts      # Design system color palette
│   ├── services/
│   │   ├── api.ts         # API service layer
│   │   └── favouriteStorage.ts # Local storage utilities
│   └── types/
│       └── index.ts       # TypeScript type definitions
├── assets/                # Static assets (images, icons)
└── package.json
```

## 🔧 Key Components

### CompanyCard
Displays company information in a beautiful card format with:
- Company logo/placeholder
- Name and domain
- Star rating and review count
- Favorite button
- Industry category tags

### SearchBar
Real-time search functionality with:
- Debounced search queries
- Loading indicators
- Clear search functionality
- Material Design styling

### StarRating
Visual rating component featuring:
- 5-star rating display
- Half-star support
- Color-coded ratings
- Customizable size

## 📱 Screens

### 1. Company Search Screen (`/`)
- Main search interface
- Real-time company search results
- Results count display
- Empty states and error handling

### 2. Company Details Screen (`/companies/[domain]`)
- Comprehensive company information
- Reviews list with customer feedback
- Rating distribution (if available)
- Favorite toggle functionality

### 3. Favorites Screen (`/favorites`)
- List of saved companies
- Remove favorites functionality
- Empty state when no favorites
- Navigation to company details

## 🔄 API Integration

The app integrates with the Trustpilot API through RapidAPI:

### Endpoints Used
- `GET /company-search` - Search for companies by query
- `GET /company-reviews` - Fetch reviews for a specific company

### Data Models
```typescript
interface Company {
  company_id: string;
  name: string;
  domain: string;
  review_count: number;
  rating: number;
  trust_score: number;
  categories: CompanyCategory[];
  // ... other fields
}

interface Review {
  review_id: string;
  review_text: string;
  review_rating: number;
  consumer_name: string;
  review_time: string;
  // ... other fields
}
```

## 💾 Data Persistence

### Favorites Storage
- Uses AsyncStorage for local data persistence
- Stores favorite companies with full details
- Survives app restarts
- Works completely offline

### Storage Schema
```typescript
interface FavoriteCompany {
  company_id: string;
  name: string;
  domain: string;
  rating: number;
  review_count: number;
  dateAdded: string;
}
```

## 🎨 Design System

### Color Palette
The app uses a carefully crafted color system:

```typescript
const colors = {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9', // Main primary
    900: '#0c4a6e',
  },
  secondary: {
    500: '#ef4444', // Main secondary
  },
  // ... other semantic colors
}
```

### Code Quality
- TypeScript for type safety
- Consistent code formatting
- Component-based architecture
- Proper error handling

## 🚀 Performance Optimizations

- **Debounced Search**: Prevents excessive API calls
- **FlatList Virtualization**: Efficient rendering of long lists
- **Image Caching**: Optimized image loading
- **Memoized Components**: Reduced unnecessary re-renders
- **Efficient State Management**: Minimal state updates


## Time Breakdown (6 Hours)
### Hour 1: Project Setup & Foundation (0-60 mins)

    ✅ Expo project initialization

    ✅ TypeScript configuration

    ✅ Project structure setup

    ✅ Basic navigation routing

    ✅ Color system and design tokens

### Hour 2: API Integration & Data Layer (60-120 mins)

    ✅ Trustpilot API service setup

    ✅ Axios configuration with RapidAPI headers

    ✅ Type definitions for Company/Review models

    ✅ API error handling and response parsing

### Hour 3: Core Components (120-180 mins)

    ✅ CompanyCard component with ratings display

    ✅ SearchBar with debounced input

    ✅ StarRating visual component

    ✅ FavoriteButton with toggle logic

### Hour 4: Main Search Screen (180-240 mins)

    ✅ Company list with FlatList virtualization

    ✅ Real-time search functionality

    ✅ Favorite management system

    ✅ Empty states and loading indicators

### Hour 5: Company Details and Favorite Screen (240-300 mins)

    ✅ Dynamic routing with Expo Router

    ✅ Company information display

    ✅ Reviews list implementation

    ✅ Pull-to-refresh functionality

### Hour 6: Polish & Final Touches (300-360 mins)

    ✅ Favorites screen implementation

    ✅ AsyncStorage persistence layer

    ✅ Error boundaries and loading states

    ✅ Code cleanup and documentation

    ✅ README file creation


## 🚀 What I'd Add Next with More Time

### If I had more time, my immediate priorities would be:

    Ensure Company Details Screen Works Completely

        Fix the API integration to properly display all reviews

        Implement proper error handling for review loading

        Add pagination for large review sets

        Ensure all review data displays correctly

    Implement Offline Functionality with Cached Data

        Cache company search results locally

        Store company details and reviews for offline access

        Implement sync strategy for when connection returns

        Add offline indicators and retry mechanisms

### These two features are crucial for the app:

    Complete Company Details: Users need to see all reviews to make informed decisions

    Offline Support: Essential for mobile users who may have spotty connectivity
