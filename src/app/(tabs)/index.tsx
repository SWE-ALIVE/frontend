import { StyleSheet } from "react-native";

import { Bold } from "@/components/common/Bold";
import { Button } from "@/components/common/Button";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledInput from "@/components/common/InputField";
import { useState } from "react";

export default function HomeScreen() {
  const [phone, setPhone] = useState<string>("");
  return (
    <SafeAreaView style={styles.container}>
      <StyledInput
        label="전화번호"
        value={phone}
        onChangeText={setPhone}
        type="decimal-pad"
        validation={(text) => /^\d{0,11}$/.test(text)}
        placeholder="전화번호를 입력하세요"
      />
      <StyledInput
        label="비밀번호"
        value={phone}
        onChangeText={setPhone}
        validation={(text) => /^\d{0,11}$/.test(text)}
        placeholder="비밀번호를 입력하세요"
      />
      {/* <ThemedView>
        <ThemedText type="titleLarge" style={{ marginBottom: 16 }}>
          볼드체를 사용하기 위해서는{" "}
          <Bold type="titleLarge">볼드 컴포넌트</Bold>를 사용하세요.
        </ThemedText>
        <Button variant="filled" onPress={() => {}}>
          Open Developer Tools
        </Button>
      </ThemedView> */}
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
