import { Message } from "@/types/chat";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { ChatBubble } from "./ChatBubble";

interface ChatContainerProps {
  messages: Message[];
}

const ChatContainer = ({ messages }: ChatContainerProps) => {
  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.user.role === "operator";
    return (
      <View
        style={[
          styles.chatBubbleContainer,
          isUser ? styles.userBubble : styles.otherBubble,
        ]}
      >
        {!isUser && (
          <ThemedText type="subhead" style={{ marginBottom: 4 }}>
            {item.user.nickname}
          </ThemedText>
        )}
        <ChatBubble {...item} />
      </View>
    );
  };

  return (
    <FlatList
      data={messages}
      renderItem={renderItem}
      keyExtractor={(message) => message.message_id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  chatBubbleContainer: {
    marginVertical: 12,
    flex: 1,
  },
  userBubble: {
    alignItems: "flex-end",
  },
  otherBubble: {
    alignItems: "flex-start",
  },
});

export default ChatContainer;
