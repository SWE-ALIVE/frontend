import ChatContainer from "@/components/chat/ChatContainer";
import { ChatModal } from "@/components/chat/ChatDrawer";
import { ChatInput } from "@/components/chat/ChatInput";
import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import BellIcon from "@/components/icons/Bell";
import MoreVerticalIcon from "@/components/icons/MoreVertical";
import { Colors } from "@/constants/colors.constant";
import { useModal } from "@/hooks/useModal";
import { getChatRoom } from "@/service/channel.service";
import { getMessages } from "@/service/message.service";
import { useUserStore } from "@/stores/useUserStore";
import { Message, MessageBody } from "@/types/chat";
import { Feather } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

type ChatParams = {
  channel_url: string;
  channel_name: string;
};

export default function ChatScreen() {
  const queryClient = useQueryClient();

  const userId = useUserStore((state) => state.user?.id);

  const { channel_url, channel_name } = useLocalSearchParams<ChatParams>();
  console.log("This Channel : channel url" + channel_url);
  const { isVisible, toggle, close } = useModal();
  const router = useRouter();
  const {
    data: messages,
    isLoading: isMessageLoading,
    error,
    refetch,
  } = useQuery<Message[]>({
    queryKey: ["messages", channel_url],
    queryFn: async () => {
      const response = await getMessages({
        channel_url,
        message_ts: "",
      });
      return response.messages;
    },
    enabled: !!userId && !!channel_url && !!channel_name,
    refetchInterval: 1000, // 1초마다 자동으로 새 메시지 확인
    refetchIntervalInBackground: false,
  });

  const { data: userChatRooms, isLoading: isDeviceLoading } = useQuery({
    queryKey: ["channel", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const response = await getChatRoom(userId);
      return response;
    },
    enabled: !!userId,
  });

  const currentChannelDevices =
    userChatRooms?.find((channel) => channel.channel_id === channel_url)
      ?.devices || [];
  const deviceNicknames = currentChannelDevices.map(
    (device) => device.nickname
  );
  useEffect(() => {
    setMessage((prev) => ({
      ...prev,
      message: "",
      channel_url: channel_url,
    }));
  }, [channel_url]);

  // const [message, setMessage] = useState<MessageBody>({
  //   message: "",
  //   channel_url: channel_url,
  //   user_id: userId ?? "", // 기본값으로 빈 문자열 사용
  // });
  const [message, setMessage] = useState<MessageBody>(() => ({
    message: "",
    channel_url: channel_url,
    user_id: userId ?? "",
  }));

  // const appendMessage = async (newMessage: Message) => {
  //   if (messages) {
  //     messages.push(newMessage);
  //     refetch();
  //   }
  // };
  const appendMessage = async (newMessage: Message) => {
    // 캐시된 메시지 목록에 새 메시지를 즉시 추가 (UI 즉시 업데이트)
    queryClient.setQueryData(
      ["messages", channel_url],
      (oldData: Message[] | undefined) => {
        if (!oldData) return [newMessage];
        return [...oldData, newMessage];
      }
    );

    // 서버와 동기화하여 실제 데이터 확인
    refetch();
  };

  // 컴포넌트 언마운트 시 정리 작업 추가
  useEffect(() => {
    return () => {
      queryClient.resetQueries({
        queryKey: ["messages", channel_url],
      });
      toggle();
    };
  }, []);

  // useEffect(() => {
  //   return () => {
  //     toggle();
  //   };
  // }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ThemedView style={styles.container}>
        <AppBar
          title={channel_name}
          align="left"
          leftIcon={{
            icon: <Feather name="chevron-left" size={24} color="black" />,
            onPress: () => router.push("/chat"),
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
              onPress: () => router.push("/(tabs)/inbox"),
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
              onPress: toggle,
            },
          ]}
        />
        <ThemedView style={{ paddingHorizontal: 16, flex: 1 }}>
          {messages &&
          !isMessageLoading &&
          userChatRooms &&
          !isDeviceLoading ? (
            <>
              {/* <ThemedView style={styles.inviteContainer}>
                {deviceNicknames.map((nickname, index) => (
                  <ThemedText key={index} type="body" color={Colors.light.tint}>
                    {nickname}
                    {index !== deviceNicknames.length - 1 ? ", " : ""}
                  </ThemedText>
                ))}
                <ThemedText type="body" color={Colors.light.tint}>
                  를 초대했습니다.
                </ThemedText>
              </ThemedView> */}
              <ThemedView style={{ flex: 1, paddingBottom: 0 }}>
                <ChatContainer
                  messages={messages}
                  deviceNicknames={deviceNicknames}
                />
              </ThemedView>
            </>
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
        <ChatModal
          isVisible={isVisible}
          onClose={close}
          name={channel_name}
          userChatRooms={userChatRooms}
        />
      </ThemedView>
    </KeyboardAvoidingView>
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
    flexWrap: "wrap",
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
      nickname: "준성",
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
