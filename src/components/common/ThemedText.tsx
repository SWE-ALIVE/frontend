import { Text } from "react-native";

import { ThemedTextProps, typography } from "@/constants/typography.constant";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedText({
  style,
  color,
  bold = false,
  type = "body",
  ...rest
}: ThemedTextProps) {
  const themedColor = useThemeColor("text");
  const boldFontFamily =
    bold && type.startsWith("title") ? "LGEIHeadline-Bold" : "LGEIText-Bold";
  return (
    <Text
      style={[
        { color: color || themedColor },
        { fontFamily: bold ? boldFontFamily : "LGEIText-Regular" },
        { ...typography[type] },
        style,
      ]}
      {...rest}
    />
  );
}
