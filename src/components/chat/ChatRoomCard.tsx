import { Colors } from "@/constants/colors.constant";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
interface ChatRoomCardProps {
  uuid: string;
  icon: ImageSourcePropType;
  name: string;
  latestMessage: string;
  lastMessageTime: Date;
  unReadMessageCount: number;
}

export const ChatRoomCard = ({
  uuid,
  icon,
  name,
  latestMessage,
  lastMessageTime,
  unReadMessageCount,
}: ChatRoomCardProps) => {
  const router = useRouter(); // Hook for navigation

  const handlePress = () => {
    router.push(`/chat/${uuid}`); // Navigate to the chat room
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <ThemedView style={styles.cardContainer}>
        <ThemedView
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <Image
            source={icon}
            style={[styles.icon, { backgroundColor: Colors.light.tint }]}
          />
          <ThemedView>
            <ThemedText type="callout">{name}</ThemedText>
            <ThemedText type="footnote">{latestMessage}</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView
          style={{ flexDirection: "column", alignItems: "flex-end", gap: 4 }}
        >
          <ThemedText type="footnote" color={Colors.light.lowGray}>
            {dayjs(lastMessageTime).format("HH:mm")}
          </ThemedText>
          {unReadMessageCount > 0 && (
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
                {unReadMessageCount}
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
