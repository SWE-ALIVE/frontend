import ChatContainer from "@/components/chat/ChatContainer";
import { ChatInput } from "@/components/chat/ChatInput";
import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import BellIcon from "@/components/icons/Bell";
import MoreVerticalIcon from "@/components/icons/MoreVertical";
import { Colors } from "@/constants/colors.constant";
import { getMessages, sendMessage } from "@/service/message.service";
import { Message, MessageBody } from "@/types/chat";
import { Feather } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

type ChatParams = {
  channel_url: string;
  channel_name: string;
};

export default function ChatScreen() {
  const { channel_url, channel_name } = useLocalSearchParams<ChatParams>();

  const {
    data: messages,
    isLoading,
    error,
    refetch,
  } = useQuery<Message[]>({
    queryKey: ["messages", channel_url],
    queryFn: async () => {
      const limit = 4;
      const response = await getMessages({ channel_url, limit });
      return response.messages;
    },
    enabled: !!channel_url,
  });

  const [message, setMessage] = useState<MessageBody>({
    message: "",
    channel_url: "",
    user_id: "",
  });

  const mutation = useMutation({
    mutationFn: (newMessage: MessageBody) => sendMessage(newMessage),
  });

  const appendMessage = (newMessage: Message) => {
    const newMessageBody: MessageBody = {
      channel_url: newMessage.channel_url,
      user_id: newMessage.user.user_id,
      message: newMessage.message,
    };

    // Send message to server
    mutation.mutate(newMessageBody, {
      onSuccess: () => {
        refetch(); // Refetch messages on success
      },
    });

    // Update local messages immediately
    if (messages) {
      messages.push(newMessage);
    }
  };

  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <AppBar
        title={channel_name}
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
        {messages ? (
          <ChatContainer messages={messages} />
        ) : (
          <View style={{ flex: 1 }} />
        )}
        {error && (
          <ThemedView
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedText type="body">
              오류가 발생했습니다. 다시 시도해주세요.
            </ThemedText>
          </ThemedView>
        )}
        <ChatInput
          message={message}
          setMessage={setMessage}
          appendMessage={appendMessage}
        />
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

const dummyMessages: Message[] = [
  {
    type: "MESG",
    message_id: 7701692633,
    message: "안방이 좀 어둡네.",
    created_at: 1731754565120,
    user: {
      user_id: "user123",
      profile_url: "https://example.com/user123.png",
      require_auth_for_profile_image: false,
      nickname: "철수",
      role: "operator",
      is_active: true,
    },
    channel_url: "living_room",
    mentioned_users: [],
    mention_type: "users",
    silent: false,
    is_op_msg: false,
    message_events: {
      send_push_notification: "receivers",
      update_unread_count: true,
      update_mention_count: true,
      update_last_message: true,
    },
  },
  {
    type: "MESG",
    message_id: 7701692634,
    message: "안방에 있는 전등을 킬까요?",
    created_at: 1731754566120,
    user: {
      user_id: "operator001",
      profile_url: "",
      require_auth_for_profile_image: false,
      nickname: "전등",
      role: {},
      is_active: true,
    },
    channel_url: "living_room",
    mentioned_users: [],
    mention_type: "users",
    silent: false,
    is_op_msg: true,
    message_events: {
      send_push_notification: "receivers",
      update_unread_count: true,
      update_mention_count: true,
      update_last_message: true,
    },
  },
];
