import { ChatRoomCard } from "@/components/chat/ChatRoomCard";
import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import BellIcon from "@/components/icons/Bell";
import DotsCircle from "@/components/icons/DotsCircle";
import MoreVerticalIcon from "@/components/icons/MoreVertical";
import PlusIcon from "@/components/icons/Plus";
import { Colors } from "@/constants/colors.constant";
import { getChannels } from "@/service/channel.service";
import { useUserStore } from "@/stores/useUserStore";
import { Message } from "@/types/chat";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
export default function HomeScreen() {
  const userId = useUserStore((state) => state.user?.id);

  const router = useRouter();
  const { data: channels, error } = useQuery({
    queryKey: ["channels", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const response = await getChannels(userId);
      return response.channels;
    },
    enabled: !!userId,
    refetchInterval: 3000, // 3초마다 새로운 데이터 확인
    refetchIntervalInBackground: false, // 앱이 백그라운드일 때는 폴링 중지
    staleTime: 1000, // 데이터를 1초 동안 신선한 상태로 유지
  });
  console.log(error);

  return (
    <ThemedView style={styles.container}>
      <AppBar
        title="LG ALIVE"
        align="left"
        rightIcons={[
          {
            icon: (
              <PlusIcon
                width={24}
                height={24}
                color={Colors.light.text}
                strokeWidth={1}
              />
            ),
            onPress: () => router.push("/chat/create_chat_room"),
          },
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
            onPress: () => console.log("Search"),
          },
        ]}
      />
      <ThemedView style={{ paddingHorizontal: 16 }}>
        <ThemedView style={{ paddingBottom: 32 }}>
          <ThemedText
            type="callout"
            style={{ marginTop: 40, marginBottom: 16 }}
          >
            최근 실행된 가전제품
          </ThemedText>
          <ThemedView style={styles.flewRow}>
            <DotsCircle width={48} height={48} color={Colors.light.lowGray} />
          </ThemedView>
        </ThemedView>
        <ThemedView>
          <ThemedText type="callout" style={{ marginBottom: 16 }}>
            채팅방 목록
          </ThemedText>
          <FlatList
            data={channels}
            scrollEnabled={false}
            renderItem={({ item }) => <ChatRoomCard {...item} />}
            keyExtractor={(channel) => channel.channel_url}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  flewRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexCol: {
    flexDirection: "column",
    alignItems: "center",
  },
});

const exampleMessage: Message = {
  type: "MESG",
  message_id: 7701692635,
  message: "안방에 있는 전등을 킬까요?",
  created_at: 1731754566120,
  user: {
    user_id: "operator001",
    profile_url: "",
    require_auth_for_profile_image: false,
    nickname: "전등",
    role: "operator",
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
};
