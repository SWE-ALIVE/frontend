import { useThemeColor } from "@/hooks/useThemeColor";
import React, { ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "./ThemedText";

type ButtonVariants = "outlined" | "filled" | "text";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariants;
  disabled?: boolean;
} & TouchableOpacityProps;

export const Button = ({
  children,
  disabled = false,
  variant = "filled",
  ...props
}: ButtonProps) => {
  const background = useThemeColor("background");
  const tint = useThemeColor("tint");
  const disabledColor = useThemeColor("disabled");

  const getVariantStyles = () => {
    switch (variant) {
      case "outlined":
        return {
          backgroundColor: "transparent",
          borderColor: tint,
          borderWidth: 1,
        };
      case "text":
        return {
          backgroundColor: "transparent",
        };
      case "filled":
      default:
        return {
          backgroundColor: tint,
        };
    }
  };

  const textColor = variant === "filled" ? background : tint;

  return (
    <TouchableOpacity
      style={[
        styles.common,
        getVariantStyles(),
        disabled && {
          opacity: 0.4,
        },
      ]}
      disabled={disabled}
      {...props}
    >
      <ThemedText
        type="headline"
        disabled={disabled}
        style={{ color: textColor }}
      >
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  common: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
