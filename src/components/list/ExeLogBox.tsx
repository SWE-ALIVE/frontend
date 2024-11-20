import { Colors } from "@/constants/colors.constant";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
import { StyleSheet } from "react-native";

interface ExeLogBoxProps {
  usageDate: string;
  mode: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: string;
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

export const ExeLogBox = ({
  usageDate,
  mode,
  startTime,
  endTime,
  duration,
  status,
}: ExeLogBoxProps) => {
  console.log(usageDate);
  const date = new Date(usageDate);
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="callout">{mode}</ThemedText>
      <ThemedText
        style={{ marginTop: 4, color: Colors.light.lowGray }}
        type="body"
      >
        {date.getMonth() + 1}월 {date.getDate()}일 {formatTime(startTime)}~
        {formatTime(endTime)}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
});
