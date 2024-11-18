import { Chat } from "@/types/chat";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { ChatBubble } from "./ChatBubble";

interface ChatContainerProps {
  chats: Chat[];
}

const ChatContainer = ({ chats }: ChatContainerProps) => {
  const renderItem = ({ item }: { item: Chat }) => (
    <View
      style={[
        styles.chatBubbleContainer,
        item.isUser ? styles.userBubble : styles.otherBubble,
      ]}
    >
      {!item.isUser && (
        <ThemedText type="subhead" style={{ marginBottom: 4 }}>
          {item.senderName}
        </ThemedText>
      )}
      <ChatBubble {...item} />
    </View>
  );

  return (
    <FlatList
      data={chats}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
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
