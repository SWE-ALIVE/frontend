import { Colors } from "@/constants/colors.constant";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ThemedView } from "../common/ThemedView";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isMessageEmpty = message.trim().length === 0 || isFocused;

  const sendMessage = () => {
    console.log(message);
    setMessage("");
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          {
            backgroundColor: isMessageEmpty
              ? "#EDEDED"
              : Colors.light.background,
            color: isMessageEmpty ? "#CACACA" : Colors.light.black,
            borderWidth: isMessageEmpty ? 0 : 1,
          },
        ]}
        onChangeText={setMessage}
        value={message}
        placeholder="메시지를 입력하세요"
      />
      <TouchableOpacity
        onPress={sendMessage}
        style={[
          styles.sendButton,
          {
            backgroundColor: isMessageEmpty
              ? Colors.light.background
              : Colors.light.black,
            borderColor: isMessageEmpty
              ? Colors.light.tint
              : Colors.light.black,
          },
        ]}
      >
        {isMessageEmpty ? (
          <Feather name="mic" size={24} color={Colors.light.tint} />
        ) : (
          <Feather name="arrow-up" size={24} color={Colors.light.background} />
        )}
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 32,
    borderWidth: 1,
  },
  sendButton: {
    width: 48,
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    marginLeft: 8,
    borderWidth: 1,
  },
});
