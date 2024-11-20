import { StyleSheet } from "react-native";

import { Bold } from "@/components/common/Bold";
import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";

export default function ListScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title1" style={{ marginBottom: 8 }}>
        가전제품 목록 페이지입니다.
      </ThemedText>
      <ThemedView>
        <ThemedText type="title1" style={{ marginBottom: 16 }}>
          볼드체를 사용하기 위해서는 <Bold type="title1">볼드 컴포넌트</Bold>를
          사용하세요.
        </ThemedText>
        <Button variant="filled" onPress={() => {}}>
          Open Developer Tools
        </Button>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    flex: 1,
    justifyContent: "center",
  },
});
