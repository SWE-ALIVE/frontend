import { Colors } from "@/constants/colors.constant";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
import { StyleSheet } from "react-native";

interface contentBoxProp {
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
export const ContentBox = ({
  mode,
  startTime,
  endTime,
  duration,
  status,
}: contentBoxProp) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="callout">{mode}</ThemedText>
      <ThemedText
        style={{ marginTop: 4, color: Colors.light.lowGray }}
        type="body"
      >
        {formatTime(startTime)}~{formatTime(endTime)}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
});
