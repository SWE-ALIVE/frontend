import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default function CreateChatNameScreen() {
  const router = useRouter();
  const [chatName, setChatName] = useState("");
  return (
    <ThemedView style={{ flex: 1 }}>
      <AppBar
        align="left"
        title="채팅방 개설"
        leftIcon={{
          icon: <Feather name="chevron-left" size={24} color={"black"} />,
          onPress: () => router.push("/chat"),
        }}
        rightIcons={[
          {
            icon: (
              <ThemedText
                type="headline"
                color={
                  chatName.length === 0
                    ? Colors.light.textDisabled
                    : Colors.light.black
                }
              >
                확인
              </ThemedText>
            ),
            onPress: () => router.push("/chat"),
            disabled: chatName.length === 0,
          },
        ]}
      />
      <ThemedView
        style={{
          marginTop: 24,
          marginHorizontal: 16,
          flex: 1,
          position: "relative",
        }}
      >
        <ThemedText type="title3" style={{ marginBottom: 24 }}>
          채팅방의 이름을 설정해주세요
        </ThemedText>
        <StyledInput
          value={chatName}
          onChangeText={(text) => setChatName(text)}
          placeholder="안방"
        />
      </ThemedView>
      <ThemedText type="subhead" style={styles.lengthText}>
        {chatName.length} / 10
      </ThemedText>
    </ThemedView>
  );
}

interface StyledInputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  validate?: (value: string) => boolean;
  error?: boolean;
}

function StyledInput({
  value,
  onChangeText,
  label,
  validate = () => true,
  secureTextEntry = false,
  error = false,
  ...props
}: StyledInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChangeText = (text: string) => {
    if (text.length > 10) return;
    setIsValid(validate(text));
    onChangeText?.(text);
  };

  const getBorderColor = () => {
    if (error) return Colors.light.tint;
    if (isFocused) return Colors.light.black;
    if (!value) return Colors.light.lightGray;
    return Colors.light.black;
  };

  return (
    <ThemedView style={styles.container}>
      {label && (
        <ThemedText type="footnote" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <ThemedView style={{ height: 40 }}>
        <TextInput
          style={[styles.input, { borderBottomColor: getBorderColor() }]}
          value={value}
          onChangeText={handleChangeText}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          secureTextEntry={secureTextEntry}
          {...props}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#374151",
  },
  input: {
    height: "100%",
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize: 18,
    lineHeight: 22,
  },
  lengthText: {
    position: "absolute", // 절대 위치
    right: 16,
    top: 198,
    color: Colors.light.textDisabled,
  },
});
