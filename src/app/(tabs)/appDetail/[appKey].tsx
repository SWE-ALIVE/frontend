import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";

export default function AppDetailScreen() {
  const { appKey, translatedCategory, name } = useLocalSearchParams<{
    appKey: string;
    translatedCategory: string;
    name: string;
  }>();

  return (
    <ScrollView style={styles.container}>
      <ThemedView
        style={{
          marginTop: 24,
          alignItems: "center",
          justifyContent: "center",
          width: "auto",
          height: 272,
          flexDirection: "column",
          gap: 4,
        }}
      >
        <ThemedView
          style={{ backgroundColor: Colors.light.tint, width: 64, height: 64 }}
        ></ThemedView>
        <ThemedText>{translatedCategory}</ThemedText>
        <ThemedText>{name}</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedView style={{ flexDirection: "row" }}>
          <ThemedText style={{ marginRight: 16 }}>
            현재 참여중인 채팅방
          </ThemedText>
          <ThemedView style={{ flex: 1 }}>
            <ThemedView
              style={{
                borderBottomWidth: 1,
                borderColor: Colors.light.lightGray,
                width: "auto",
                height: 12,
              }}
            ></ThemedView>
            <ThemedView
              style={{
                height: 12,
              }}
            ></ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedView style={{ paddingVertical: 12 }}>
          <ThemedText>현재 참여중인 가전 채팅방 목록... </ThemedText>
          <ThemedView
            style={{
              marginVertical: 24,
              borderWidth: 1,
              borderRadius: 16,
              borderColor: Colors.light.lowGray,
              width: "auto",
              height: 80,
            }}
          ></ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedView>
        <ThemedView style={{ flexDirection: "row" }}>
          <ThemedText style={{ marginRight: 16 }}>실행 내역</ThemedText>
          <ThemedView style={{ flex: 1 }}>
            <ThemedView
              style={{
                borderBottomWidth: 1,
                borderColor: Colors.light.lightGray,
                width: "auto",
                height: 12,
              }}
            ></ThemedView>
            <ThemedView
              style={{
                height: 12,
              }}
            ></ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedView style={{ paddingVertical: 12 }}>
          <ThemedText>현재 참여중인 가전 채팅방 목록... </ThemedText>
          <ThemedView
            style={{
              marginVertical: 24,
              borderWidth: 1,
              borderRadius: 16,
              borderColor: Colors.light.lowGray,
              width: "auto",
              height: 80,
            }}
          ></ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedView style={{ alignItems: "center", marginVertical: 32 }}>
        <ThemedText type="subhead" style={{ color: "red" }}>
          이 기기 삭제하기
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 24,
  },
});
