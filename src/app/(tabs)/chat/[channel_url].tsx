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
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

type ChatParams = {
  channel_url: string;
  channel_name: string;
};

export default function ChatScreen() {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.user?.id);
  const { channel_url, channel_name } = useLocalSearchParams<ChatParams>();
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
    refetchInterval: 3000,
  });

  const {
    data: userChatRooms,
    isLoading: isDeviceLoading,
    refetch: refetchChatRooms,
  } = useQuery({
    queryKey: ["channel", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const response = await getChatRoom(userId);
      if (response && response.length > 0) {
      }
      return response;
    },
  });
  useFocusEffect(
    useCallback(() => {
      refetchChatRooms();
      refetch();
    }, [refetchChatRooms, refetch])
  );

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

  const [message, setMessage] = useState<MessageBody>(() => ({
    message: "",
    channel_url: channel_url,
    user_id: userId ?? "",
  }));

  const appendMessage = async (newMessage: Message) => {
    // queryClient.setQueryData(
    //   ["messages", channel_url],
    //   (oldData: Message[] | undefined) => {
    //     if (!oldData) return [newMessage];
    //     return [...oldData, newMessage];
    //   }
    // );
    refetch();
  };

  useEffect(() => {
    return () => {
      queryClient.resetQueries({
        queryKey: ["messages", channel_url],
      });
      toggle();
    };
  }, []);

  const lastAIMessage =
    messages && messages.length > 0
      ? messages.filter((msg) => msg.user.role === "").slice(-1)[0]?.message
      : undefined;

  const sys = lastAIMessage ? [lastAIMessage] : [""];

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
          messages.length > 0 &&
          !isMessageLoading &&
          userChatRooms &&
          !isDeviceLoading &&
          currentChannelDevices.length > 0 ? (
            <ThemedView style={{ flex: 1, paddingBottom: 0 }}>
              <ChatContainer
                messages={messages}
                deviceNicknames={deviceNicknames}
              />
            </ThemedView>
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
            sys={sys}
          />
        </ThemedView>
        <ChatModal
          isVisible={isVisible}
          onClose={close}
          name={channel_name}
          userChatRooms={userChatRooms}
          channelUrl={channel_url}
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
