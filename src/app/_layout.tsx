import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "LGEIHeadline-Bold": require("../assets/fonts/LGEIHeadlineTTF-Bold.ttf"),
    "LGEIHeadline-SemiBold": require("../assets/fonts/LGEIHeadlineTTF-Semibold.ttf"),
    "LGEIHeadline-Regular": require("../assets/fonts/LGEIHeadlineTTF-Regular.ttf"),
    "LGEIHeadline-Light": require("../assets/fonts/LGEIHeadlineTTF-Light.ttf"),
    "LGEIText-Bold": require("../assets/fonts/LGEITextTTF-Bold.ttf"),
    "LGEIText-Regular": require("../assets/fonts/LGEITextTTF-Regular.ttf"),
    "LGEIText-Light": require("../assets/fonts/LGEITextTTF-Light.ttf"),
  });

  useEffect(() => {
    let splashTimeout: NodeJS.Timeout;

    if (loaded) {
      // 최소 1초 스플래시 화면을 유지
      splashTimeout = setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }

    return () => {
      if (splashTimeout) clearTimeout(splashTimeout);
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
