import { ThemedTextProps } from "@/constants/typography.constant";
import React from "react";
import { ThemedText } from "./ThemedText";

interface BoldProps extends Omit<ThemedTextProps, "bold"> {
  children: React.ReactNode;
}

export function Bold({ children, style, type, ...rest }: BoldProps) {
  return (
    <ThemedText style={style} bold={true} type={type} {...rest}>
      {children}
    </ThemedText>
  );
}
