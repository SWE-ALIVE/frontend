import { CustomCalendar } from "@/components/analysis/CustomCalendar";
import { DatePickerModal } from "@/components/analysis/DatePickerModal";
import { RecordList } from "@/components/analysis/RecordsList";
import { ThemedView } from "@/components/common/ThemedView";
import { getRecords } from "@/service/records.service";
import { MarkedDates } from "@/types/record.types";
import { createMarkedDates } from "@/utils/calendar";
import { formatToday, getKSTDate } from "@/utils/date";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { DateData } from "react-native-calendars";

export default function AnalysisScreen() {
  const [selectedDate, setSelectedDate] = useState(formatToday());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const records = getRecords();
  useEffect(() => {
    setMarkedDates(createMarkedDates(records, selectedDate));
  }, [selectedDate]);

  const handleDateSelect = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setPickerVisible(false);
  };
  const handleTodayPress = () => {
    const currentDate = getKSTDate();
    const newToday = currentDate.toISOString().split("T")[0];
    setSelectedDate(newToday);
    setSelectedYear(currentDate.getFullYear());
    setSelectedMonth(currentDate.getMonth() + 1);
  };

  return (
    <ThemedView style={styles.container}>
      <CustomCalendar
        selectedDate={selectedDate}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        markedDates={markedDates}
        onDateSelect={(day: DateData) => setSelectedDate(day.dateString)}
        onYearMonthPress={() => setPickerVisible(true)}
        onTodayPress={handleTodayPress}
      />

      {selectedDate && (
        <RecordList records={records} selectedDate={selectedDate} />
      )}

      <DatePickerModal
        visible={isPickerVisible}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onClose={() => setPickerVisible(false)}
        onDateSelect={handleDateSelect}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
  },
});
