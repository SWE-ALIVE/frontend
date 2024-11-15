import { StyleSheet, TextProps } from "react-native";

export type Typography =
  | "titleLarge"
  | "title1"
  | "title2"
  | "title3"
  | "headline"
  | "body"
  | "callout"
  | "subhead"
  | "footnote"
  | "caption1"
  | "caption2";

export type ThemedTextProps = TextProps & {
  color?: string;
  type?: Typography;
  bold?: boolean;
};

export const typography = StyleSheet.create({
  titleLarge: {
    fontSize: 34,
    fontWeight: "400",
    lineHeight: 41,
    fontFamily: "LGEIHeadline-Regular",
  },
  title1: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
    fontFamily: "LGEIHeadline-Bold",
  },
  title2: {
    fontSize: 22,
    fontWeight: "400",
    lineHeight: 28,
    fontFamily: "LGEIHeadline-Regular",
  },
  title3: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 25,
    fontFamily: "LGEIHeadline-Regular",
  },
  headline: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
    fontFamily: "LGEIHeadline-SemiBold",
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    fontFamily: "LGEIText-Regular",
  },
  callout: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 21,
    fontFamily: "LGEIText-Regular",
  },
  subhead: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    fontFamily: "LGEIText-Regular",
  },
  footnote: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
    fontFamily: "LGEIText-Regular",
  },
  caption1: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    fontFamily: "LGEIText-Regular",
  },
  caption2: {
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 13,
    fontFamily: "LGEIText-Regular",
  },
});
