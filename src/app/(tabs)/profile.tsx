import { StyleSheet } from "react-native";

import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { clearUser, user } = useUserStore();
  const router = useRouter();

  const logout = () => {
    clearUser();
    router.push("/");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ThemedText type="title1" style={{ marginBottom: 8 }}>
        프로필페이지입니다.
      </ThemedText>
      <ThemedView>
        <ThemedText type="title1" style={{ marginBottom: 16 }}>
          정보
        </ThemedText>
        <ThemedText type="title1" style={{ marginBottom: 16 }}>
          {user?.name}
        </ThemedText>
        <ThemedText type="title1" style={{ marginBottom: 16 }}>
          {user?.phone_number}
        </ThemedText>
        <ThemedText type="title1" style={{ marginBottom: 16 }}>
          로그아웃
        </ThemedText>
        <Button variant="filled" onPress={logout}>
          Open Developer Tools
        </Button>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    flex: 1,
    justifyContent: "center",
  },
});
