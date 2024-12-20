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
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { FlatList, ScrollView, StyleSheet } from "react-native";
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
  });

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
          <ScrollView>
            <FlatList
              data={channels}
              scrollEnabled={false}
              renderItem={({ item }) => <ChatRoomCard {...item} />}
              keyExtractor={(channel) => channel.channel_url}
              style={{ marginBottom: 500 }}
            />
          </ScrollView>
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
