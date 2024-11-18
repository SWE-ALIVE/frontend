import { StyleSheet } from "react-native";
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
        validate={(text) => /^\d{0,11}$/.test(text)}
        placeholder="전화번호를 입력하세요"
      />
      <StyledInput
        label="비밀번호"
        value={phone}
        onChangeText={setPhone}
        validate={(text) => /^\d{0,11}$/.test(text)}
        placeholder="비밀번호를 입력하세요"
      />
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
