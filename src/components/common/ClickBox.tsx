import { TouchableOpacity, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/colors.constant";

interface ClickBoxProps {
  title?: string;
  timeRange?: string;
  content?: string;
}

export const ClickBox = ({ title, timeRange, content }: ClickBoxProps) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <ThemedView style={styles.contentContainer}>
        <ThemedView>
          <ThemedText type="headline">{title}</ThemedText>
          <ThemedText type="body" style={{ marginTop: 4 }}>
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
