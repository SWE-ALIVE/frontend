import { ChatRoomCard } from "@/components/chat/ChatRoomCard";
import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import BellIcon from "@/components/icons/Bell";
import DotsCircle from "@/components/icons/DotsCircle";
import MoreVerticalIcon from "@/components/icons/MoreVertical";
import PlusIcon from "@/components/icons/Plus";
import { Colors } from "@/constants/colors.constant";
import { Channel } from "@/service/channel.service";
import { Message } from "@/types/chat";
import { FlatList, StyleSheet } from "react-native";
export default function HomeScreen() {
  const date = new Date();

  const renderItem = ({ item }: { item: Channel }) => (
    <ChatRoomCard key={item.channel_url} {...item} />
  );

  return (
    <ThemedView style={styles.container}>
      <AppBar
        title="LG MACS"
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
            onPress: () => console.log("Search"),
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
            data={dummyChannels}
            renderItem={renderItem}
            keyExtractor={(channel) => channel.channel_url}
            contentContainerStyle={styles.channelContainer}
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
  channelContainer: {
    gap: 20,
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

const dummyChannels: Channel[] = [
  {
    channel_url: "total",
    name: "전체 채팅방",
    cover_url:
      "https://res.cloudinary.com/dvhm5zqi5/image/upload/v1731955612/rounded-lg_dmw0sr.png",
    member_count: 12,
    joined_member_count: 12,
    unread_message_count: 1,
    last_message: exampleMessage,
  },
  {
    channel_url: "living_room",
    name: "거실",
    cover_url:
      "https://res.cloudinary.com/dvhm5zqi5/image/upload/v1731955612/rounded-lg_dmw0sr.png",
    member_count: 3,
    joined_member_count: 3,
    unread_message_count: 0,
    last_message: exampleMessage,
  },
  {
    channel_url: "toilet",
    name: "화장실",
    cover_url:
      "https://res.cloudinary.com/dvhm5zqi5/image/upload/v1731955612/rounded-lg_dmw0sr.png",
    member_count: 4,
    joined_member_count: 4,
    unread_message_count: 1,
    last_message: exampleMessage,
  },
];
