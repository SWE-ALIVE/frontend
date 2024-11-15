import { Tabs } from "expo-router";
import React from "react";

import { ThemedText } from "@/components/common/ThemedText";
import AnalysisIcon from "@/components/icons/Analysis";
import HomeIcon from "@/components/icons/Home";
import ProfileIcon from "@/components/icons/Profile";
import WalletIcon from "@/components/icons/Wallet";
import { Colors } from "@/constants/colors.constant";
import { useColorScheme } from "@/hooks/useColorScheme";

const ROUTE_TITLES = {
  index: "홈",
  list: "목록",
  analysis: "분석",
  profile: "프로필",
} as const;

type RouteName = keyof typeof ROUTE_TITLES;

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? "light"].tint;
  const inactiveColor = "#9DB2CE";
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarStyle: {
          height: 96,
          paddingTop: 16,
        },
        tabBarLabel: ({ focused }) =>
          focused ? (
            <ThemedText type="footnote" color={Colors["light"].tint}>
              {ROUTE_TITLES[route.name as RouteName]}
            </ThemedText>
          ) : null,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => (
            <HomeIcon color={color} width={24} height={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "목록",
          tabBarIcon: ({ color }) => (
            <WalletIcon color={color} width={24} height={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: "분석",
          tabBarIcon: ({ color }) => (
            <AnalysisIcon color={color} width={24} height={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "프로필",
          tabBarIcon: ({ color }) => (
            <ProfileIcon color={color} width={24} height={24} />
          ),
        }}
      />
    </Tabs>
  );
}
