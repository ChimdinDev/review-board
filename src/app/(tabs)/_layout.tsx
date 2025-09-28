// app/(tabs)/_layout.tsx - Tab navigation layout

import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/src/constants/colors";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerTintColor: colors.neutral[0],
        tabBarBackground: () => (
          <LinearGradient
            colors={[colors.primary[400], colors.primary[400]]}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarActiveTintColor: colors.primary['50'],
        tabBarInactiveTintColor: colors.primary['500'],
        tabBarStyle: {
          backgroundColor: colors.neutral[0],
          borderTopWidth: 0.5,
          borderTopColor: colors.neutral[200],
          elevation: 6,
          shadowColor: colors.shadow.medium,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Companies",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favourite"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
