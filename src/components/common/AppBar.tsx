import { Colors } from "@/constants/colors.constant";
import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
interface AppBarProps {
  title?: string;
  leftIcon?: { icon: ReactNode; onPress: () => void };
  rightIcons?: { icon: ReactNode; onPress: () => void }[];
  align?: "center" | "left";
}

export function AppBar({
  title,
  align = "center",
  leftIcon,
  rightIcons = [],
}: AppBarProps) {
  const noLeftAndTitle = !leftIcon && !title; // 조건 체크

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#fff" }}>
      <ThemedView style={styles.header}>
        {leftIcon && (
          <TouchableOpacity onPress={leftIcon.onPress}>
            {leftIcon.icon}
          </TouchableOpacity>
        )}
        {title && (
          <ThemedText
            type={"title3"}
            bold
            style={[align === "center" ? styles.center : styles.left]}
          >
            {title}
          </ThemedText>
        )}
        <ThemedView
          style={[
            styles.rightIcons,
            noLeftAndTitle && { marginLeft: "auto" }, // 조건부 스타일
          ]}
        >
          {rightIcons.map((icon, index) => (
            <TouchableOpacity key={index} onPress={icon.onPress}>
              {icon.icon}
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    height: 56,
  },
  center: {
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  left: {
    flex: 1,
    textAlign: "left",
    marginHorizontal: 8,
  },
  rightIcons: {
    flexDirection: "row",
    gap: 8,
  },
});
