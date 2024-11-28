import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ExeLogBox } from "@/components/list/ExeLogBox";
import { ParticipatingChatRoom } from "@/components/list/ParticipatingChatRoom";
import { Colors } from "@/constants/colors.constant";
import { getChannels } from "@/service/channel.service";
import { getDeviceUsage } from "@/service/device.service";
import { useUserStore } from "@/stores/useUserStore";
import { DeviceIconMap } from "@/types/device";
import Feather from "@expo/vector-icons/Feather";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function AppDetailScreen() {
  const { appKey, category, translatedCategory, name } = useLocalSearchParams<{
    appKey: string;
    category: keyof typeof DeviceIconMap;
    translatedCategory: string;
    name: string;
  }>();
  const userId = useUserStore((state) => state.user?.id);
  const {
    data: channels = [],
    error: channelError,
    isLoading: channelLoading,
  } = useQuery({
    queryKey: ["channels", appKey],
    queryFn: async () => {
      if (!userId) throw new Error("user Id is required");
      const response = await getChannels(userId);
      return response.channels;
    },
    enabled: !!appKey,
  });
  if (channelError) {
    console.log("channel Error" + channelError.message);
  }

  const {
    data: deviceUsage,
    error: deviceError,
    isLoading: deviceLoading,
  } = useQuery({
    queryKey: ["deviceUsage", appKey, userId],
    queryFn: async () => {
      if (!userId || !appKey)
        throw new Error("User ID and App key are required");
      const res = await getDeviceUsage(userId, appKey);
      return res;
    },
  });
  if (deviceError) {
    console.log("device Error" + deviceError.message);
  }
  const IconComponent = DeviceIconMap[category];
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 19);
  };
  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
  };
  const renderActions = () => {
    if (!deviceUsage?.actions?.length) {
      return <ThemedText>실행 내역이 없습니다.</ThemedText>;
    }

    return deviceUsage.actions.map((action, index) => {
      const startDateTime = formatDateTime(action.start_time);
      const endDateTime = formatDateTime(action.end_time);
      const duration = calculateDuration(action.start_time, action.end_time);

      return (
        <ThemedView key={index} style={{ marginVertical: 4 }}>
          <ExeLogBox
            usageDate={new Date(startDateTime).toISOString().split("T")[0]}
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
        <ThemedView>
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
          <ThemedView
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              backgroundColor: Colors.light.lowGray,
              position: "absolute",
              top: 54,
              right: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="camera" size={8} color={Colors.light.background} />
          </ThemedView>
        </ThemedView>
        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 8,
            alignItems: "center",
          }}
        >
          <ThemedText style={{ marginLeft: 10 }}>
            {translatedCategory}{" "}
          </ThemedText>
          <Feather name="edit-2" size={10} color={Colors.light.lowGray} />
        </ThemedView>

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
          {!deviceUsage?.channels?.length ? (
            <ThemedText>참여 중인 채팅방이 없습니다.</ThemedText>
          ) : (
            deviceUsage.channels.map((room) => {
              const channelInfo = channels.find(
                (channel) => channel.channel_url === room.channel_id
              );

              return channelInfo ? (
                <ParticipatingChatRoom
                  key={room.channel_name}
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
        <ThemedText type="subhead" style={{ color: "red", marginBottom: 64 }}>
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
