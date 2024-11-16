import { Colors } from "@/constants/colors.constant";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
  Animated,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type InputPadTypes = "decimal-pad" | "default";

interface StyledInputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  type?: InputPadTypes;
  label?: string;
  validation?: (value: string) => boolean;
  secureTextEntry?: boolean;
  error?: boolean;
}

export default function StyledInput({
  value,
  onChangeText,
  type = "default",
  label,
  validation = () => true,
  secureTextEntry = false,
  error = false,

  ...props
}: StyledInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const animatedHeight = useState(new Animated.Value(40))[0];

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(animatedHeight, {
      toValue: 48,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(animatedHeight, {
      toValue: 40,
      useNativeDriver: false,
    }).start();
  };

  const handleChangeText = (text: string) => {
    // decimal-pad 타입일 경우 숫자만 허용
    if (type === "decimal-pad") {
      // 숫자가 아닌 문자가 있으면 업데이트하지 않음
      if (!/^\d*$/.test(text)) {
        return;
      }
    }

    setIsValid(validation(text));
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
      <Animated.View style={{ height: animatedHeight }}>
        <TextInput
          style={[styles.input, { borderBottomColor: getBorderColor() }]}
          value={value}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={type}
          {...props}
        />
      </Animated.View>
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
    fontSize: 13,
    lineHeight: 18,
  },
});
