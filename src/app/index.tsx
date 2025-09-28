// app/welcome.tsx - Beautiful onboarding welcome screen

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary[600]} />
      
      <LinearGradient
        colors={[colors.primary[500], colors.primary[700], colors.primary[900]]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={[colors.neutral[0], colors.neutral[100]]}
              style={styles.iconGradient}
            >
              <Ionicons name="star" size={48} color={colors.primary[600]} />
            </LinearGradient>
          </View>
          
          <Text style={styles.title}>ReviewBoard</Text>
          <Text style={styles.subtitle}>
            Discover. Review. Decide.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <FeatureItem
            icon="search"
            title="Smart Search"
            description="Find companies instantly with our powerful search engine"
          />
          
          <FeatureItem
            icon="analytics"
            title="Detailed Reviews"
            description="Read authentic reviews from verified customers"
          />
          
          <FeatureItem
            icon="heart"
            title="Save Favorites"
            description="Keep track of companies you care about"
          />
          
          <FeatureItem
            icon="cloud-offline"
            title="Offline Access"
            description="Access your data even without internet connection"
          />
        </View>

        {/* CTA Section */}
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.neutral[0], colors.neutral[50]]}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.primary[600]} />
            </LinearGradient>
          </TouchableOpacity>
          
          <Text style={styles.footerText}>
            Join thousands of users making informed decisions
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

// Feature Item Component
interface FeatureItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIconContainer}>
        <Ionicons name={icon} size={24} color={colors.neutral[0]} />
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[600],
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconGradient: {
    width: 68,
    height: 68,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow.heavy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.neutral[0],
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: colors.primary[100],
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  featuresContainer: {
    paddingVertical: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  featureIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 24,
    backgroundColor: colors.primary[400],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[0],
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: colors.primary[100],
    lineHeight: 20,
  },
  ctaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
  },
  primaryButton: {
    width: "80%",
    marginBottom: 24,
    shadowColor: colors.shadow.heavy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary[600],
    marginRight: 8,
  },
  footerText: {
    fontSize: 14,
    color: colors.primary[200],
    textAlign: 'center',
    fontWeight: '300',
  },
});