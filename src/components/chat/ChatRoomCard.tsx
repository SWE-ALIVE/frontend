import { Colors } from "@/constants/colors.constant";
import { Channel } from "@/service/channel.service";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";

export const ChatRoomCard = (channel: Channel) => {
  const { channel_url, cover_url, name, last_message, unread_message_count } =
    channel;
  const router = useRouter();

  const handlePress = () => {
    router.push(`/chat/${channel_url}`);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <ThemedView style={styles.cardContainer}>
        <ThemedView
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <Image
            source={{ uri: cover_url }}
            style={[styles.icon, { backgroundColor: Colors.light.tint }]}
          />
          <ThemedView>
            <ThemedText type="callout">{name}</ThemedText>
            <ThemedText type="footnote">{last_message.message}</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView
          style={{ flexDirection: "column", alignItems: "flex-end", gap: 4 }}
        >
          <ThemedText type="footnote" color={Colors.light.lowGray}>
            {dayjs(last_message.created_at).format("HH:mm")}
          </ThemedText>
          {unread_message_count > 0 && (
            <ThemedView
              style={{
                backgroundColor: Colors.light.tint,
                width: 16,
                height: 16,
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ThemedText type="footnote" style={{ color: "white" }}>
                {unread_message_count}
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 999,
    marginRight: 24,
  },
  textContainer: {
    flex: 1,
  },
  messagePreview: {
    fontSize: 14,
    color: "gray",
  },
  messageTime: {
    fontSize: 12,
    color: "gray",
  },
});
