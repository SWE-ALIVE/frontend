import { StyleSheet } from "react-native";

import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { clearUser, user } = useUserStore();
  const router = useRouter();

  const logout = () => {
    clearUser();
    router.push("/");
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ paddingHorizontal: 32 }}>
        <ThemedText type="title1" style={{ marginBottom: 8, height: 80 }}>
          프로필
        </ThemedText>
        <ThemedText type="title3" style={{ marginBottom: 16 }}>
          {user?.name}
        </ThemedText>
        <ThemedText type="title3" style={{ marginBottom: 16 }}>
          {user?.phone_number}
        </ThemedText>
      </ThemedView>
      <ThemedView
        style={{ backgroundColor: Colors.light.buttonDisabled, flex: 1 }}
      >
        <ThemedView
          style={{
            padding: 32,
            backgroundColor: Colors.light.buttonDisabled,
          }}
        >
          <ThemedView
            style={{
              height: 32,
              flex: 1,
              backgroundColor: "white",
              paddingVertical: 40,
              borderRadius: 12,
              marginBottom: 12,
            }}
          ></ThemedView>
          <ThemedView
            style={{
              height: 32,
              flex: 1,
              backgroundColor: "white",
              paddingVertical: 40,
              borderRadius: 12,
              marginBottom: 12,
            }}
          ></ThemedView>
          <ThemedView
            style={{
              height: 32,
              flex: 1,
              backgroundColor: "white",
              paddingVertical: 40,
              borderRadius: 12,
              marginBottom: 24,
            }}
          ></ThemedView>
          <Button variant="filled" onPress={logout}>
            로그아웃
          </Button>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
