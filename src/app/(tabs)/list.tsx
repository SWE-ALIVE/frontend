import { StyleSheet } from "react-native";
import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { useRouter } from "expo-router";

export default function ListScreen() {
  const router = useRouter();
  const handlePress = (appKey: number) => () => {
    router.push({
      pathname: "/appDetail/[appKey]",
      params: { appKey },
    });
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <ThemedText type="title1">가전제품 목록</ThemedText>
        <ThemedView
          style={{ marginVertical: 24, flexDirection: "column", gap: 8 }}
        >
          <Button variant="filled" onPress={handlePress(7)}>
            Open Developer Tools
          </Button>
          <Button variant="filled" onPress={handlePress(7)}>
            Open Developer Tools
          </Button>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
