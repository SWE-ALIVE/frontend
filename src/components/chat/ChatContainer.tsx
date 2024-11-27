import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { Message } from "@/types/chat";
import React, { useCallback, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ChatBubble } from "./ChatBubble";

interface ChatContainerProps {
  messages: Message[];
  deviceNicknames: string[];
}

const ChatContainer = ({ messages, deviceNicknames }: ChatContainerProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = useCallback(
    (delay = 100) => {
      if (scrollViewRef.current) {
        const timeoutId = setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, delay);
        return () => clearTimeout(timeoutId);
      }
    },
    [messages]
  );

  // 초기 렌더링 시 스크롤
  useEffect(() => {
    scrollToBottom(100);
  }, []);

  // 메시지 변경 시 스크롤
  useEffect(() => {
    scrollToBottom(100);
  }, [messages]);

  const renderMessage = useCallback((message: Message) => {
    const isUser = message.user.role === "operator";

    return (
      <View
        key={message.message_id}
        style={[
          styles.chatBubbleContainer,
          isUser ? styles.userBubble : styles.otherBubble,
        ]}
      >
        {!isUser && (
          <ThemedText type="subhead" style={styles.nickname}>
            {message.user.nickname}
          </ThemedText>
        )}
        <ChatBubble {...message} />
      </View>
    );
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.mainContainer}
      contentContainerStyle={styles.contentContainer}
      onContentSizeChange={() => scrollToBottom(50)}
      onLayout={() => scrollToBottom(50)}
      showsVerticalScrollIndicator={false}
    >
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
      <View style={styles.messagesContainer}>
        {messages.map(renderMessage)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flexGrow: 1,
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
  messagesContainer: {
    flex: 1,
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
  nickname: {
    marginBottom: 4,
  },
});

export default React.memo(ChatContainer);
// import { ThemedText } from "@/components/common/ThemedText";
// import { ThemedView } from "@/components/common/ThemedView";
// import { Colors } from "@/constants/colors.constant";
// import { Message } from "@/types/chat";
// import React, { useCallback, useEffect, useRef } from "react";
// import { FlatList, StyleSheet, View } from "react-native";
// import { ChatBubble } from "./ChatBubble";

// interface ChatContainerProps {
//   messages: Message[];
//   deviceNicknames: string[];
// }

// const ChatContainer = ({ messages, deviceNicknames }: ChatContainerProps) => {
//   const flatListRef = useRef<FlatList<Message>>(null);

//   const scrollToBottom = useCallback(
//     (delay = 100) => {
//       if (flatListRef.current && messages.length > 0) {
//         const timeoutId = setTimeout(() => {
//           flatListRef.current?.scrollToEnd({ animated: true });
//         }, delay);
//         return () => clearTimeout(timeoutId);
//       }
//     },
//     [messages]
//   );

//   // 초기 렌더링 시 스크롤
//   useEffect(() => {
//     scrollToBottom(100);
//   }, []);

//   // 메시지 변경 시 스크롤
//   useEffect(() => {
//     scrollToBottom(100);
//   }, [messages]);

//   const renderItem = useCallback(({ item }: { item: Message }) => {
//     const isUser = item.user.role === "operator";

//     return (
//       <View
//         style={[
//           styles.chatBubbleContainer,
//           isUser ? styles.userBubble : styles.otherBubble,
//         ]}
//       >
//         {!isUser && (
//           <ThemedText type="subhead" style={styles.nickname}>
//             {item.user.nickname}
//           </ThemedText>
//         )}
//         <ChatBubble {...item} />
//       </View>
//     );
//   }, []);

//   return (
//     <ThemedView style={styles.mainContainer}>
//       <ThemedView style={styles.inviteContainer}>
//         {deviceNicknames.map((nickname, index) => (
//           <ThemedText key={index} type="body" color={Colors.light.tint}>
//             {nickname}
//             {index !== deviceNicknames.length - 1 ? ", " : ""}
//           </ThemedText>
//         ))}
//         <ThemedText type="body" color={Colors.light.tint}>
//           를 초대했습니다.
//         </ThemedText>
//       </ThemedView>
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(message) => message.message_id.toString()}
//         contentContainerStyle={styles.container}
//         onContentSizeChange={() => scrollToBottom(50)}
//         onLayout={() => scrollToBottom(50)}
//         inverted={false}
//         showsVerticalScrollIndicator={false}
//         maintainVisibleContentPosition={{
//           minIndexForVisible: 0,
//           autoscrollToTopThreshold: 10,
//         }}
//         initialNumToRender={messages.length}
//         windowSize={21}
//         removeClippedSubviews={false}
//       />
//     </ThemedView>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     width: "100%",
//   },
//   container: {
//     paddingHorizontal: 16,
//     flexGrow: 1,
//   },
//   inviteContainer: {
//     marginTop: 32,
//     marginBottom: 24,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     borderWidth: 1,
//     borderColor: Colors.light.tint,
//     borderRadius: 8,
//     flexWrap: "wrap",
//   },
//   chatBubbleContainer: {
//     marginVertical: 12,
//     flex: 1,
//   },
//   userBubble: {
//     alignItems: "flex-end",
//   },
//   otherBubble: {
//     alignItems: "flex-start",
//   },
//   nickname: {
//     marginBottom: 4,
//   },
// });

// export default React.memo(ChatContainer);

// import { Message } from "@/types/chat";
// import React, { useCallback, useEffect, useRef } from "react";
// import { FlatList, StyleSheet, View } from "react-native";
// import { ThemedText } from "../common/ThemedText";
// import { ChatBubble } from "./ChatBubble";
// interface ChatContainerProps {
//   messages: Message[];
// }

// const ChatContainer = ({ messages }: ChatContainerProps) => {
//   const flatListRef = useRef<FlatList<Message>>(null);

//   const scrollToBottom = useCallback(
//     (delay = 100) => {
//       if (flatListRef.current && messages.length > 0) {
//         const timeoutId = setTimeout(() => {
//           flatListRef.current?.scrollToEnd({ animated: true });
//         }, delay);
//         return () => clearTimeout(timeoutId);
//       }
//     },
//     [messages]
//   );

//   // 초기 렌더링 시 스크롤
//   useEffect(() => {
//     scrollToBottom(100);
//   }, []);

//   // 메시지 변경 시 스크롤
//   useEffect(() => {
//     scrollToBottom(100);
//   }, [messages]);

//   const renderItem = useCallback(({ item }: { item: Message }) => {
//     const isUser = item.user.role === "operator";

//     return (
//       <View
//         style={[
//           styles.chatBubbleContainer,
//           isUser ? styles.userBubble : styles.otherBubble,
//         ]}
//       >
//         {!isUser && (
//           <ThemedText type="subhead" style={styles.nickname}>
//             {item.user.nickname}
//           </ThemedText>
//         )}
//         <ChatBubble {...item} />
//       </View>
//     );
//   }, []);

//   return (
//     <FlatList
//       ref={flatListRef}
//       data={messages}
//       renderItem={renderItem}
//       keyExtractor={(message) => message.message_id.toString()}
//       contentContainerStyle={styles.container}
//       onContentSizeChange={() => scrollToBottom(50)}
//       onLayout={() => scrollToBottom(50)}
//       inverted={false}
//       showsVerticalScrollIndicator={false}
//       maintainVisibleContentPosition={{
//         minIndexForVisible: 0,
//         autoscrollToTopThreshold: 10,
//       }}
//       initialNumToRender={messages.length} // 모든 메시지를 한 번에 렌더링
//       windowSize={21} // 스크롤 성능 최적화
//       removeClippedSubviews={false} // 메시지가 잘리는 것을 방지
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//     flexGrow: 1,
//     justifyContent: "flex-end",
//   },
//   chatBubbleContainer: {
//     marginVertical: 12,
//     flex: 1,
//   },
//   userBubble: {
//     alignItems: "flex-end",
//   },
//   otherBubble: {
//     alignItems: "flex-start",
//   },
//   nickname: {
//     marginBottom: 4,
//   },
// });

// export default React.memo(ChatContainer);
