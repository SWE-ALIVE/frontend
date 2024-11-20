import { FlatList, Pressable, StyleSheet } from "react-native";

import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
export default function InboxScreen() {
  const router = useRouter();

  return (
    <ThemedView style={{ flex: 1 }}>
      <AppBar
        title="수신함"
        align="left"
        leftIcon={{
          icon: <Feather name="chevron-left" size={24} color="black" />,
          onPress: () => router.back(),
        }}
      />
      <ThemedView style={styles.container}>
        <FlatList
          data={inboxData}
          renderItem={({ item }) => <Inbox {...item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <ThemedView
              style={{
                backgroundColor: Colors.light.lightGray,
                height: 0.5,
                paddingHorizontal: 8,
              }}
            />
          )}
        />
      </ThemedView>
    </ThemedView>
  );
}

type InboxProps = {
  id: string;
  message: string;
  time: string;
  from: string;
  read?: boolean;
};

const Inbox = ({ from, message, time, read }: InboxProps) => {
  const router = useRouter();
  return (
    <Pressable
      style={{ marginVertical: 16 }}
      onPress={() =>
        router.push({
          pathname: "/chat/[channel_url]",
          params: {
            channel_url: "living_room",
            channel_name: "전체 채팅방",
          },
        })
      }
    >
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
          position: "relative",
        }}
      >
        <ThemedText type="callout">{message}</ThemedText>
        <ThemedText type="caption2" color={Colors.light.lowGray}>
          {time}
        </ThemedText>
        {!read && <ThemedView style={styles.unreadDot} />}
      </ThemedView>
      <ThemedText color={Colors.light.lowGray}>{from}</ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
    flex: 1,
  },
  unreadDot: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: Colors.light.tint,
    position: "absolute",
    right: 0,
    top: -2,
  },
});

const inboxData: InboxProps[] = [
  {
    id: "1",
    from: "전체 채팅방",
    message: "에어컨이 파워 냉방모드로 실행되었습니다.",
    time: "10:00 AM",
    read: false,
  },
  {
    id: "2",
    from: "안방",
    message: "세탁기가 울 세탁 모드로 실행되었습니다.",
    time: "11:00 AM",
    read: true,
  },
  {
    id: "3",
    from: "전체 채팅방",
    message: "건조기가 청바지 모드로 실행되었습니다.",
    time: "10:10 AM",
    read: true,
  },
];
