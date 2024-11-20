import { Colors } from "@/constants/colors.constant";
import { Channel } from "@/service/channel.service";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";

export const ParticipatingChatRoom = (channel: Channel) => {
  const { channel_url, cover_url, name, last_message, unread_message_count } =
    channel;
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: `/chat/[channel_url]`,
      params: { channel_url: channel_url, channel_name: name },
    });
  };

  return (
    <TouchableHighlight underlayColor="#DDDDDD" onPress={handlePress}>
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
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
