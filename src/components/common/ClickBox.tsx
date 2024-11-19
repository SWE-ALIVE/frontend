import { TouchableOpacity, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/colors.constant";
import { useRouter } from "expo-router";

interface ExeHistory {
  name: string;
  startTime: string;
  endTime: string;
  status: "success" | "fail" | "running";
  duration: number;
  eleUsage: {
    Wh: number;
    fare: number;
  };
}

interface ClickBoxProps {
  title: string;
  day: string;
  content: string;
  exeHistory: ExeHistory[];
  exekey: string;
}
const formatTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "오후" : "오전";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${period} ${formattedHours}:${formattedMinutes}`;
};

const getTimeRanges = (exeHistory: ExeHistory[]) => {
  return exeHistory
    .map((history) => {
      const start = formatTime(history.startTime);
      const end = formatTime(history.endTime);
      return `${start} ~ ${end}`;
    })
    .join(", ");
};
export const ClickBox = ({
  title,
  day,
  content,
  exeHistory,
  exekey,
}: ClickBoxProps) => {
  const router = useRouter();
  const timeRange = getTimeRanges(exeHistory);

  const handlePress = () => {
    router.push({
      pathname: "/exeAnalysis/[exeKey]",
      params: {
        day,
        content,
        exeHistory: JSON.stringify(exeHistory),
        exeKey: exekey,
      },
    });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <ThemedView style={styles.contentContainer}>
        <ThemedView style={{ flex: 1, marginRight: 48 }}>
          <ThemedText type="headline">{title}</ThemedText>
          <ThemedText
            type="body"
            style={{ marginTop: 4 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {timeRange}
          </ThemedText>
        </ThemedView>
        <Feather name="chevron-right" size={20} color={Colors.light.lowGray} />
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 28,
    flex: 1,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
