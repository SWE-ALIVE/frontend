import LGWhiteIcon from "@/assets/images/lg-white.png";
import { ChatRoomCard } from "@/components/chat/ChatRoomCard";
import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import BellIcon from "@/components/icons/Bell";
import DotsCircle from "@/components/icons/DotsCircle";
import MoreVerticalIcon from "@/components/icons/MoreVertical";
import PlusIcon from "@/components/icons/Plus";
import { Colors } from "@/constants/colors.constant";
import { StyleSheet } from "react-native";
export default function HomeScreen() {
  const date = new Date();
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
          <ThemedView style={styles.flexCol}>
            <ChatRoomCard
              uuid="d554b429-366f-4d8e-929d"
              icon={LGWhiteIcon}
              name="전체 채팅방"
              lastMessageTime={date}
              latestMessage="에어컨, 세탁기, 건조기, TV, 냉장고1, 냉..."
              unReadMessageCount={1}
            />
          </ThemedView>
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
