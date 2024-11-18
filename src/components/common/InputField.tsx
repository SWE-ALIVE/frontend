import { Colors } from "@/constants/colors.constant";
import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, Animated } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type InputPadTypes = "decimal-pad" | "default";

interface StyledInputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  type?: InputPadTypes;
  label?: string;
  validate?: (value: string) => boolean;
  secureTextEntry?: boolean;
  error?: boolean;
}

export default function StyledInput({
  value,
  onChangeText,
  type = "default",
  label,
  validate = () => true,
  secureTextEntry = false,
  error = false,
  ...props
}: StyledInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const animatedHeight = useState(new Animated.Value(40))[0];

  const handleChangeText = (text: string) => {
    if (type === "decimal-pad") {
      if (!/^\d*$/.test(text)) {
        return;
      }
    }
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
      <Animated.View style={{ height: animatedHeight }}>
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
