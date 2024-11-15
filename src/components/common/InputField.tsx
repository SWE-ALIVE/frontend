import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
  Animated,
} from "react-native";

type InputPadTypes = "decimal-pad" | "default";

interface StyledInputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  type?: InputPadTypes;
  label?: string;
  validation?: (value: string) => boolean;
}

export default function StyledInput({
  value,
  onChangeText,
  type = "default",
  label,
  validation = () => true,
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
    setIsValid(validation(text));
    onChangeText?.(text);
  };

  const getBorderColor = () => {
    if (!isValid) return "#EF4444";
    if (!value) return "#D1D5DB";
    if (isFocused) return "#000000";
    return "#040404";
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View style={{ height: animatedHeight }}>
        <TextInput
          style={[styles.input, { borderBottomColor: getBorderColor() }]}
          value={value}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType={type}
          {...props}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#374151",
  },
  input: {
    height: "100%",
    borderWidth: 0,
    borderBottomWidth: 2,
    padding: 10,
  },
});
