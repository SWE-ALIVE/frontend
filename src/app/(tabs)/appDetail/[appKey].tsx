import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { useQuery } from "@tanstack/react-query";
import { DeviceUsageResponse, getDeviceUsage } from "@/service/device.service";
import { getChannels } from "@/service/channel.service";
import { ParticipatingChatRoom } from "@/components/list/ParticipatingChatRoom";
import { Channel } from "@/service/channel.service";
import { ContentBox } from "@/components/analysis/ContentBox";
import { ExeLogBox } from "@/components/list/ExeLogBox";
import { DeviceIconMap, TranslateDeviceName } from "@/types/device";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const deviceUsage: DeviceUsageResponse = {
  device_name: "삼성 그랑데 세탁기",
  chatRoom: [
    {
      chatRoom_name: "kitchen_device_room",
      chatRoom_device: ["세탁기", "건조기", "에어컨"],
    },
    {
      chatRoom_name: "livingroom_device_room",
      chatRoom_device: ["TV", "공기청정기", "에어컨"],
    },
    {
      chatRoom_name: "bedroom_device_room",
      chatRoom_device: ["TV", "공기청정기", "에어컨"],
    },
  ],
  action: [
    {
      action_description: "표준 세탁",
      usage_date: "2024-03-20",
      start_time: "14:30",
      end_time: "15:45",
    },
    {
      action_description: "찌든때 세탁",
      usage_date: "2024-03-20",
      start_time: "18:00",
      end_time: "19:30",
    },
    {
      action_description: "헹굼 건조",
      usage_date: "2024-03-19",
      start_time: "10:15",
      end_time: "11:00",
    },
  ],
};
// const channels: Channel[] = [
//   {
//     channel_url: "kitchen_device_room",
//     name: "주방가전 채팅방",
//     cover_url: "https://example.com/kitchen.jpg",
//     member_count: 15,
//     joined_member_count: 8,
//     unread_message_count: 3,
//     last_message: {
//       type: "MESG",
//       message_id: 12345,
//       message: "식기세척기 사용 팁 공유해요",
//       created_at: Date.now(),
//       channel_url: "kitchen_device_room",
//       mentioned_users: [],
//       mention_type: "users",
//       silent: false,
//       is_op_msg: false,
//       message_events: {
//         send_push_notification: "true",
//         update_unread_count: true,
//         update_mention_count: true,
//         update_last_message: true,
//       },
//       user: {
//         user_id: "user1",
//         profile_url: "https://example.com/user1.jpg",
//         require_auth_for_profile_image: false,
//         nickname: "주방마스터",
//         role: "operator",
//         is_active: true,
//       },
//     },
//   },
//   {
//     channel_url: "livingroom_device_room",
//     name: "거실가전 채팅방",
//     cover_url: "https://example.com/living.jpg",
//     member_count: 20,
//     joined_member_count: 12,
//     unread_message_count: 5,
//     last_message: {
//       type: "MESG",
//       message_id: 12346,
//       message: "에어컨 청소 방법 질문있습니다",
//       created_at: Date.now(),
//       channel_url: "livingroom_device_room",
//       mentioned_users: [],
//       mention_type: "users",
//       silent: false,
//       is_op_msg: false,
//       message_events: {
//         send_push_notification: "true",
//         update_unread_count: true,
//         update_mention_count: true,
//         update_last_message: true,
//       },
//       user: {
//         user_id: "user2",
//         profile_url: "https://example.com/user2.jpg",
//         require_auth_for_profile_image: false,
//         nickname: "홈케어러",
//         role: {},
//         is_active: true,
//       },
//     },
//   },
// ];

const channels: Channel[] = [
  {
    channel_url: "kitchen_device_room",
    name: "주방가전 채팅방",
    cover_url: "https://example.com/kitchen.jpg",
    member_count: 15,
    joined_member_count: 8,
    unread_message_count: 3,
    last_message: {
      type: "MESG",
      message_id: 12345,
      message: "식기세척기 사용 팁 공유해요",
      created_at: Date.now(),
      channel_url: "kitchen_device_room",
      mentioned_users: [],
      mention_type: "users",
      silent: false,
      is_op_msg: false,
      message_events: {
        send_push_notification: "true",
        update_unread_count: true,
        update_mention_count: true,
        update_last_message: true,
      },
      user: {
        user_id: "user1",
        profile_url: "https://example.com/user1.jpg",
        require_auth_for_profile_image: false,
        nickname: "주방마스터",
        role: "operator",
        is_active: true,
      },
    },
  },
  {
    channel_url: "livingroom_device_room",
    name: "거실가전 채팅방",
    cover_url: "https://example.com/living.jpg",
    member_count: 20,
    joined_member_count: 12,
    unread_message_count: 5,
    last_message: {
      type: "MESG",
      message_id: 12346,
      message: "에어컨 청소 방법 질문있습니다",
      created_at: Date.now(),
      channel_url: "livingroom_device_room",
      mentioned_users: [],
      mention_type: "users",
      silent: false,
      is_op_msg: false,
      message_events: {
        send_push_notification: "true",
        update_unread_count: true,
        update_mention_count: true,
        update_last_message: true,
      },
      user: {
        user_id: "user2",
        profile_url: "https://example.com/user2.jpg",
        require_auth_for_profile_image: false,
        nickname: "홈케어러",
        role: {},
        is_active: true,
      },
    },
  },
  {
    channel_url: "bedroom_device_room",
    name: "침실가전 채팅방",
    cover_url: "https://example.com/bedroom.jpg",
    member_count: 10,
    joined_member_count: 6,
    unread_message_count: 2,
    last_message: {
      type: "MESG",
      message_id: 12347,
      message: "가습기 관리 팁 아시는 분 계신가요?",
      created_at: Date.now(),
      channel_url: "bedroom_device_room",
      mentioned_users: [],
      mention_type: "users",
      silent: false,
      is_op_msg: false,
      message_events: {
        send_push_notification: "true",
        update_unread_count: true,
        update_mention_count: true,
        update_last_message: true,
      },
      user: {
        user_id: "user3",
        profile_url: "https://example.com/user3.jpg",
        require_auth_for_profile_image: false,
        nickname: "슬립마스터",
        role: "member",
        is_active: true,
      },
    },
  },
  {
    channel_url: "bathroom_device_room",
    name: "욕실가전 채팅방",
    cover_url: "https://example.com/bathroom.jpg",
    member_count: 8,
    joined_member_count: 4,
    unread_message_count: 1,
    last_message: {
      type: "MESG",
      message_id: 12348,
      message: "전기면도기 유지보수 팁 공유 부탁드려요",
      created_at: Date.now(),
      channel_url: "bathroom_device_room",
      mentioned_users: [],
      mention_type: "users",
      silent: false,
      is_op_msg: false,
      message_events: {
        send_push_notification: "true",
        update_unread_count: true,
        update_mention_count: true,
        update_last_message: true,
      },
      user: {
        user_id: "user4",
        profile_url: "https://example.com/user4.jpg",
        require_auth_for_profile_image: false,
        nickname: "클린샤워러",
        role: "operator",
        is_active: true,
      },
    },
  },
];

export default function AppDetailScreen() {
  const { appKey, category, translatedCategory, name } = useLocalSearchParams<{
    appKey: string;
    category: keyof typeof DeviceIconMap;
    translatedCategory: string;
    name: string;
  }>();
  // const { data: channels } = useQuery({
  //   queryKey: ["channels"],
  //   queryFn: () => getChannels("zxvm5962"),
  // });
  // const { data: deviceUsage } = useQuery({
  //   queryKey: ["deviceUsage", appKey],
  //   queryFn: () => getDeviceUsage(1, Number(appKey)), // user_id와 device_id 전달
  // });

  const IconComponent = DeviceIconMap[category];

  const renderActions = () => {
    if (!deviceUsage?.action?.length) {
      return <ThemedText>실행 내역이 없습니다.</ThemedText>;
    }

    return deviceUsage.action.map((action, index) => {
      const startDateTime = `${action.usage_date}T${action.start_time}:00`;
      const endDateTime = `${action.usage_date}T${action.end_time}:00`;
      const duration =
        (new Date(endDateTime).getTime() - new Date(startDateTime).getTime()) /
        (1000 * 60);

      return (
        <ThemedView key={index} style={{ marginVertical: 4 }}>
          <ExeLogBox
            usageDate={action.usage_date}
            mode={action.action_description}
            startTime={startDateTime}
            endTime={endDateTime}
            duration={duration}
            status="completed"
          />
        </ThemedView>
      );
    });
  };
  const iconBackgroundColor = useSharedValue(Colors.light.tint);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(iconBackgroundColor.value, { duration: 300 }),
    };
  });
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <Animated.View
          style={[
            {
              width: 72,
              height: 72,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 999,
            },
            animatedBackgroundStyle,
          ]}
        >
          <IconComponent
            width={24}
            height={24}
            color={Colors.light.background}
          />
        </Animated.View>

        <ThemedText style={{ marginTop: 8 }}>{translatedCategory}</ThemedText>
        <ThemedText>{name}</ThemedText>
      </ThemedView>

      {/* 채팅방 섹션 */}
      <ThemedView>
        <ThemedView style={styles.sectionHeader}>
          <ThemedView style={{ flexDirection: "row" }}>
            <ThemedText style={{ marginRight: 16 }}>
              현재 참여중인 채팅방
            </ThemedText>
            <ThemedView style={{ flex: 1 }}>
              <ThemedView
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.light.lightGray,
                  width: "auto",
                  height: 12,
                }}
              ></ThemedView>
              <ThemedView
                style={{
                  height: 12,
                }}
              ></ThemedView>
            </ThemedView>
          </ThemedView>
          <ThemedView style={{ flexDirection: "column" }}>
            <ThemedView style={styles.divider}></ThemedView>
            <ThemedView style={{ height: 12, width: "auto" }}></ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.sectionContent}>
          {!deviceUsage?.chatRoom?.length ? (
            <ThemedText>참여 중인 채팅방이 없습니다.</ThemedText>
          ) : (
            deviceUsage.chatRoom.map((room) => {
              const channelInfo = channels.find(
                (channel) => channel.channel_url === room.chatRoom_name
              );
              return channelInfo ? (
                <ParticipatingChatRoom
                  key={room.chatRoom_name}
                  {...channelInfo}
                />
              ) : null;
            })
          )}
        </ThemedView>
      </ThemedView>

      {/* 실행 내역 섹션 */}
      <ThemedView>
        <ThemedView style={{ flexDirection: "row" }}>
          <ThemedText style={{ marginRight: 16 }}>실행 내역 </ThemedText>
          <ThemedView style={{ flex: 1 }}>
            <ThemedView
              style={{
                borderBottomWidth: 1,
                borderColor: Colors.light.lightGray,
                width: "auto",
                height: 12,
              }}
            ></ThemedView>
            <ThemedView
              style={{
                height: 12,
              }}
            ></ThemedView>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.sectionContent}>{renderActions()}</ThemedView>
      </ThemedView>

      <ThemedView style={styles.deleteButton}>
        <ThemedText type="subhead" style={{ color: "red" }}>
          디바이스 삭제하기
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    height: 272,
    flexDirection: "column",
    gap: 4,
  },
  icon: {
    backgroundColor: Colors.light.tint,
    width: 64,
    height: 64,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.light.lightGray,
    height: 12,
  },
  sectionContent: {
    paddingVertical: 12,
  },
  deleteButton: {
    alignItems: "center",
    marginVertical: 32,
  },
});
