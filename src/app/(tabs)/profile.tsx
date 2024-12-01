import { Image, StyleSheet } from "react-native";

import Person3D from "@/assets/images/person-3d.png";
import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { useUserStore } from "@/stores/useUserStore";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
export default function ProfileScreen() {
  const { clearUser, user } = useUserStore();
  const router = useRouter();

  const logout = () => {
    clearUser();
    router.reload();
    router.push("/");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={{
          paddingHorizontal: 32,
          marginVertical: 32,
          paddingVertical: 12,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ThemedView
          style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
        >
          <Image source={Person3D} style={{ width: 92, height: 92 }} />
          <ThemedView>
            <ThemedText type="headline">{user?.name}</ThemedText>
            <ThemedText
              type="headline"
              style={{ fontFamily: "LGEIText-Regular" }}
            >
              {user?.phone_number}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <Feather name="chevron-right" size={20} />
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
              backgroundColor: "white",
              paddingVertical: 20,
              paddingHorizontal: 24,
              borderRadius: 12,
              marginBottom: 12,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ThemedText type="body" color="black">
              알림 설정
            </ThemedText>
            <Feather name="chevron-right" size={16} />
          </ThemedView>
          <ThemedView
            style={{
              backgroundColor: "white",
              paddingVertical: 20,
              paddingHorizontal: 24,
              borderRadius: 12,
              marginBottom: 12,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ThemedText type="body" color="black">
              앱 버전 확인
            </ThemedText>
            <Feather name="chevron-right" size={16} />
          </ThemedView>
          <ThemedView
            style={{
              backgroundColor: "white",
              paddingVertical: 20,
              paddingHorizontal: 24,
              borderRadius: 12,
              marginBottom: 12,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ThemedText type="body" color="black">
              언어 설정
            </ThemedText>
            <Feather name="chevron-right" size={16} />
          </ThemedView>
          <Button
            variant="text"
            onPress={logout}
            style={{
              marginTop: 32,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
