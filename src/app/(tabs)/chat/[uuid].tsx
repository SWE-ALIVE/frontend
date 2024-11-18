import ChatContainer from "@/components/chat/ChatContainer";
import { ChatInput } from "@/components/chat/ChatInput";
import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import BellIcon from "@/components/icons/Bell";
import MoreVerticalIcon from "@/components/icons/MoreVertical";
import { Colors } from "@/constants/colors.constant";
import { Chat } from "@/types/chat";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function ChatScreen() {
  const { uuid } = useLocalSearchParams();
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <AppBar
        title={"전체 채팅방"}
        align="left"
        leftIcon={{
          icon: <Feather name="chevron-left" size={24} color="black" />,
          onPress: () => router.back(),
        }}
        rightIcons={[
          {
            icon: (
              <BellIcon
                width={24}
                height={24}
                color={Colors.light.text}
                strokeWidth={1}
              />
            ),
            onPress: () => console.log("Search"),
          },
          {
            icon: (
              <MoreVerticalIcon
                width={24}
                height={24}
                color={Colors.light.text}
                strokeWidth={1}
              />
            ),
            onPress: () => console.log("Search"),
          },
        ]}
      />
      <ThemedView style={{ paddingHorizontal: 16, flex: 1 }}>
        <ThemedView style={styles.inviteContainer}>
          <ThemedText type="body" color={Colors.light.tint}>
            에어컨, 세탁기, 건조기, TV, 냉장고1, 냉장고2를 초대했습니다.
          </ThemedText>
        </ThemedView>
        <ChatContainer chats={dummyChats} />
        <ChatInput />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
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
  },
  chatContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
});

const dummyChats: Chat[] = [
  {
    id: "1",
    message: "세상에서 가장 빠른 말은?",
    isUser: true,
    senderName: "Bae",
    date: new Date("2023-10-01T10:00:00Z"),
  },
  {
    id: "2",
    message: "정답은 주말입니다.",
    isUser: false,
    senderName: "세탁기",
    date: new Date("2023-10-01T10:01:00Z"),
  },
  {
    id: "3",
    message: "오늘 날씨가 좀 덥네. 어떻게든 해결할 방법이 없을까?",
    isUser: true,
    senderName: "Bae",
    date: new Date("2023-10-01T10:02:00Z"),
  },
  {
    id: "4",
    message: "지금 에어컨을 가동할까요?",
    isUser: false,
    senderName: "에어컨",
    date: new Date("2023-10-01T10:03:00Z"),
  },
];
