import { AppBar } from "@/components/common/AppBar";
import { Button } from "@/components/common/Button";
import { Loading } from "@/components/common/Loading";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import BellIcon from "@/components/icons/Bell";
import MoreVerticalIcon from "@/components/icons/MoreVertical";
import PlusIcon from "@/components/icons/Plus";
import { Colors } from "@/constants/colors.constant";
import { Channel } from "@/service/channel.service";
import { useDeviceStore } from "@/stores/useDeviceStore";
import { Message } from "@/types/chat";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
export default function ReadyToConnectScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { is_connected, setIsConnected } = useDeviceStore();

  useFocusEffect(
    useCallback(() => {
      if (is_connected) {
        router.replace("/chat");
      }
    }, [is_connected, router])
  );

  const handleConnect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
      router.push("/chat");
    }, 2000);
  };
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
            onPress: () => console.log("가전제품 있어야 만들지 바보야"),
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
            onPress: () => console.log("가전제품 있어야 만들지 바보야"),
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
            onPress: () => console.log("가전제품 있어야 만들지 바보야"),
          },
        ]}
      />
      <ThemedView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 48,
          gap: 24,
        }}
      >
        <Button fullWidth onPress={handleConnect}>
          LG ThinQ와 연결하기
        </Button>
        <ThemedText type="body" color={Colors.light.lowGray}>
          혹은
        </ThemedText>
        <Button fullWidth variant="text">
          직접 가전제품 가져오기
        </Button>
      </ThemedView>
      <Loading isLoading={isLoading} duration={2000} />
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
