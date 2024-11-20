import { TouchableOpacity } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { ThemedView } from "@/components/common/ThemedView";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/colors.constant";

interface CustomCalendarProps {
  selectedDate: string;
  selectedYear: number;
  selectedMonth: number;
  markedDates: any;
  onDateSelect: (day: DateData) => void;
  onYearMonthPress: () => void;
  onTodayPress: () => void;
}

export const CustomCalendar = ({
  selectedDate,
  selectedYear,
  selectedMonth,
  markedDates,
  onDateSelect,
  onYearMonthPress,
  onTodayPress,
}: CustomCalendarProps) => {
  const renderHeader = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${year}. ${month}`;

    return (
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity
          onPress={onYearMonthPress}
          style={styles.headerTouchable}
        >
          <ThemedText type="titleLarge" style={{ color: Colors.light.black }}>
            {formattedDate}
          </ThemedText>
          <Feather name="chevron-down" size={20} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.todayButton} onPress={onTodayPress}>
          <ThemedText type="footnote" style={styles.todayButtonText}>
            TODAY
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  };

  return (
    <Calendar
      key={`${selectedYear}-${selectedMonth}`}
      current={`${selectedYear}-${String(selectedMonth).padStart(2, "0")}-01`}
      hideArrows={true}
      style={{
        paddingTop: 0,
      }}
      markingType={"custom"}
      markedDates={markedDates}
      onDayPress={onDateSelect}
      renderHeader={renderHeader}
      theme={{
        todayTextColor: Colors.light.tint,
      }}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingBottom: 10,
  },
  headerTouchable: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },

  todayButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.light.lowGray,
    borderRadius: 20,
  },
  todayButtonText: {
    color: Colors.light.lowGray,
  },
});
