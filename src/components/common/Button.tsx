import { Colors } from "@/constants/colors.constant";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "./ThemedText";

type ButtonVariants = "outlined" | "filled" | "text" | "disabled";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariants;
  disabled?: boolean;
  fullWidth?: boolean;
} & TouchableOpacityProps;

export const Button = ({
  children,
  disabled = false,
  variant = "filled",
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const background = useThemeColor("background");
  const tint = useThemeColor("tint");

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
      case "disabled":
        return {
          backgroundColor: Colors.light.buttonDisabled,
        };
      case "filled":
      default:
        return {
          backgroundColor: tint,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "outlined":
        return {
          color: tint,
        };
      case "text":
        return {
          color: tint,
        };
      case "disabled":
        return {
          color: Colors.light.textDisabled,
        };
      case "filled":
      default:
        return {
          color: background,
        };
    }
  };
  return (
    <TouchableOpacity
      style={[styles.common, getVariantStyles(), fullWidth && styles.fullWidth]}
      disabled={disabled}
      {...props}
    >
      <ThemedText type="headline" disabled={disabled} style={getTextColor()}>
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
  fullWidth: {
    width: "100%", // 가로 전체를 채움
  },
});
