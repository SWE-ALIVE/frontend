import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { Message } from "@/types/chat";
import React, { useCallback, useEffect, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import TypeAnimation from "../common/TypeAnimation";
import { ChatBubble } from "./ChatBubble";
interface ChatContainerProps {
  messages: Message[];
  deviceNicknames: string[];
  isLoading?: boolean;
}

const ChatContainer = ({
  messages,
  deviceNicknames,
  isLoading = false,
}: ChatContainerProps) => {
  const flatListRef = useRef<FlatList<Message>>(null);

  const scrollToBottom = useCallback(
    (delay = 100) => {
      if (flatListRef.current && messages.length > 0) {
        const timeoutId = setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, delay);
        return () => clearTimeout(timeoutId);
      }
    },
    [messages]
  );

  useEffect(() => {
    scrollToBottom(100);
  }, []);

  useEffect(() => {
    scrollToBottom(100);
  }, [messages]);

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.user.role === "operator";
    const isAI = item.user.role === "";

    const lastAIMessage = messages
      .filter((msg) => msg.user.role === "")
      .slice(-1)[0];
    const isLastAIMessage =
      isAI && item.message_id === lastAIMessage?.message_id;
    return (
      <View
        key={item.message_id}
        style={[
          styles.chatBubbleContainer,
          isUser ? styles.userBubble : styles.otherBubble,
        ]}
      >
        {!isUser && (
          <ThemedText type="subhead" style={styles.nickname}>
            {item.user.nickname}
          </ThemedText>
        )}
        {isLastAIMessage && !item.message ? (
          <ThemedText
            style={{
              flexDirection: "column",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 8,
              maxWidth: "80%",
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              borderWidth: 1,
              borderColor: Colors.light.tint,
            }}
          >
            응답을 준비하고 있습니다...
          </ThemedText>
        ) : isLastAIMessage ? (
          <TypeAnimation
            text={item.message}
            style={{
              flexDirection: "column",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 8,
              maxWidth: "80%",
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              borderWidth: 1,
              borderColor: Colors.light.tint,
            }}
          />
        ) : (
          <ChatBubble {...item} />
        )}
      </View>
    );
  };

  const ListHeaderComponent = useCallback(() => {
    return deviceNicknames ? (
      <ThemedView style={styles.inviteContainer}>
        {deviceNicknames.map((nickname, index) => (
          <ThemedText key={index} type="body" color={Colors.light.tint}>
            {nickname}
            {index !== deviceNicknames.length - 1 ? ", " : ""}
          </ThemedText>
        ))}
        <ThemedText type="body" color={Colors.light.tint}>
          를 초대했습니다.
        </ThemedText>
      </ThemedView>
    ) : (
      <ThemedView>
        <ThemedText>sdfsdf</ThemedText>
      </ThemedView>
    );
  }, [deviceNicknames]);

  if (!deviceNicknames) {
    return <ThemedText>로딩중</ThemedText>;
  }

  return (
    <FlatList
      ref={flatListRef}
      data={messages.slice(1)}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={(message) => message.message_id.toString()}
      contentContainerStyle={styles.contentContainer}
      style={styles.mainContainer}
      onContentSizeChange={() => scrollToBottom(50)}
      onLayout={() => scrollToBottom(50)}
      showsVerticalScrollIndicator={false}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
        autoscrollToTopThreshold: 10,
      }}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={21}
      removeClippedSubviews={false}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  inviteContainer: {
    marginTop: 32,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 8,
    flexWrap: "wrap",
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
  nickname: {
    marginBottom: 4,
  },
});

export default ChatContainer;
