import { Colors } from "@/constants/colors.constant";
import React from "react";
import { ThemedView } from "../common/ThemedView";
import { ThemedText } from "../common/ThemedText";
import Feather from "@expo/vector-icons/Feather";
interface ToggleTextProps {
  value?: string;
}

export default function ToggleComp({ value = "", ...props }: ToggleTextProps) {
  return (
    <ThemedView
      style={{
        borderRadius: 16,
        borderColor: "black",
        borderWidth: 1,
        // backgroundColor: Colors.light.lightGray,
        paddingVertical: 4,
        paddingHorizontal: 16,

        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText
        type="footnote"
        style={{ color: "black", textAlign: "center" }}
      >
        {value}
      </ThemedText>
      <Feather name="chevron-down" size={20} color={"black"} />
    </ThemedView>
  );
}
