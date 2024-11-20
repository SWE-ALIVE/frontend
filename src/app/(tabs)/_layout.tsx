import { Tabs, usePathname, useRouter } from "expo-router";
import React from "react";
import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import AnalysisIcon from "@/components/icons/Analysis";
import HomeIcon from "@/components/icons/Home";
import PlusIcon from "@/components/icons/Plus";
import ProfileIcon from "@/components/icons/Profile";
import SyncIcon from "@/components/icons/Sync";
import WalletIcon from "@/components/icons/Wallet";
import { Colors } from "@/constants/colors.constant";
import { useColorScheme } from "@/hooks/useColorScheme";
import Feather from "@expo/vector-icons/Feather";

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
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs
      screenOptions={({ route }) => {
        const isHomeRelatedRoute = [
          "index",
          "chat/create_chat_room",
          "chat/create_chat_name",
          "chat/index",
        ].includes(route.name);

        const isNestedRoute = [
          "chat/create_chat_room",
          "chat/create_chat_name",
          "chat/[channel_url]",
          "exeAnalysis/[exeKey]",
          "inbox",
        ].includes(route.name);

        return {
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          tabBarStyle: {
            height: 96,
            paddingTop: 16,
            display: isNestedRoute ? "none" : "flex",
          },
          tabBarLabel: ({ focused }) => {
            // 현재 라우트에 따라 라벨 설정
            if (focused) {
              return (
                <ThemedText type="footnote" color={Colors["light"].tint}>
                  {ROUTE_TITLES[route.name as RouteName] ?? ""}
                </ThemedText>
              );
            }
            return null;
          },
        };
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => {
            const isHomeRelatedRoute = ["/chat", "/index"].includes(pathname);

            return (
              <HomeIcon
                color={isHomeRelatedRoute ? Colors.light.tint : color}
                width={24}
                height={24}
              />
            );
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <WalletIcon color={color} width={24} height={24} />
          ),
          header: () => (
            <AppBar
              align="left"
              rightIcons={[
                {
                  icon: (
                    <SyncIcon
                      width={24}
                      height={24}
                      color={Colors.light.text}
                      strokeWidth={1}
                    />
                  ),
                  onPress: () => console.log("Search"),
                },
                {
                  icon: (
                    <PlusIcon
                      width={24}
                      height={24}
                      color={Colors.light.text}
                      strokeWidth={1}
                    />
                  ),
                  onPress: () => console.log("Search"),
                },
              ]}
            />
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
          header: () => <AppBar />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "프로필",
          tabBarIcon: ({ color }) => (
            <ProfileIcon color={color} width={24} height={24} />
          ),
          header: () => <AppBar />,
        }}
      />
      <Tabs.Screen
        name="chat/[channel_url]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="chat/create_chat_room"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="chat/create_chat_name"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="chat/index"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="exeAnalysis/[exeKey]"
        options={{
          href: null,
          header: () => (
            <AppBar
              title=""
              align="left"
              leftIcon={{
                icon: (
                  <Feather
                    name="chevron-left"
                    size={20}
                    color={Colors.light.lowGray}
                  />
                ),
                onPress: () => router.back(),
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="appDetail/[appKey]"
        options={{
          href: null,
          header: () => (
            <AppBar
              title=""
              align="left"
              leftIcon={{
                icon: (
                  <Feather
                    name="chevron-left"
                    size={20}
                    color={Colors.light.lowGray}
                  />
                ),
                onPress: () => router.back(),
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
