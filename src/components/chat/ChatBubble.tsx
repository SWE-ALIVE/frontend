import { Colors } from "@/constants/colors.constant";
import { Message } from "@/types/chat";
import dayjs from "dayjs";
import { StyleSheet } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";

export const ChatBubble = ({ message, created_at, user }: Message) => {
  // const formattedDate = dayjs(created_at).format("HH:mm A");
  const formattedDate = dayjs(created_at).locale("en").format("hh:mm A");
  const isUser = user.role === "operator";
  const backgroundColor = isUser ? Colors.light.tint : Colors.light.background;
  const textColor = isUser ? Colors.light.background : Colors.light.text;
  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          alignItems: isUser ? "flex-end" : "flex-start",
        },
        !isUser && styles.shadow,
      ]}
    >
      <ThemedText type="subhead" color={textColor}>
        {message}
      </ThemedText>
      {isUser && (
        <ThemedText type="caption1" color={textColor} style={{ marginTop: 12 }}>
          {formattedDate}
        </ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    maxWidth: "80%",
  },
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
