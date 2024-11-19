import { Modal, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { ClickBox } from "@/components/common/ClickBox";
import { ThemedView } from "@/components/common/ThemedView";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/colors.constant";

type Record = {
  date: string;
  content: string;
  timeRange: string;
};

type MarkedDate = {
  marked?: boolean;
  dotColor?: string;
  selected?: boolean;
  selectedColor?: string;
  customStyles?: {
    container?: {
      backgroundColor?: string;
      borderRadius?: number;
    };
    text?: {
      color?: string;
    };
  };
};

type MarkedDates = {
  [date: string]: MarkedDate;
};

export default function AnalysisScreen() {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const records: Record[] = [
    {
      date: "2024-11-15",
      content: "에어컨 실행",
      timeRange: "오후 3:00 ~ 오후 3:30",
    },
    {
      date: "2024-11-15",
      content: "에어컨 실행",
      timeRange: "오후 3:00 ~ 오후 3:30",
    },
    {
      date: "2024-11-15",
      content: "에어컨 실행",
      timeRange: "오후 3:00 ~ 오후 3:30",
    },
    {
      date: "2024-11-11",
      content: "에어컨 실행",
      timeRange: "오후 3:00 ~ 오후 3:30",
    },
    {
      date: "2024-11-23",
      content: "에어컨 실행",
      timeRange: "오후 3:00 ~ 오후 3:30",
    },
    {
      date: "2024-11-01",
      content: "에어컨 실행",
      timeRange: "오후 3:00 ~ 오후 3:30",
    },
    {
      date: "2024-11-19",
      content: "에어컨 실행",
      timeRange: "오후 3:00 ~ 오후 3:30",
    },
    {
      date: "2024-11-20",
      content: "에어컨 실행",
      timeRange: "오후 3:00 ~ 오후 3:30",
    },
  ];

  const years = Array.from({ length: 11 }, (_, i) => selectedYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const newMarkedDates = records.reduce((acc, record) => {
      acc[record.date] = {
        marked: true,
        dotColor: Colors.light.tint,
      };
      return acc;
    }, {} as typeof markedDates);

    if (selectedDate) {
      newMarkedDates[selectedDate] = {
        ...(newMarkedDates[selectedDate] || {}),
        customStyles: {
          container: {
            backgroundColor: Colors.light.tint,
            borderRadius: 20,
          },
          text: {
            color: "white",
          },
        },
        marked: newMarkedDates[selectedDate]?.marked || false,
        dotColor: newMarkedDates[selectedDate]?.dotColor,
      };
    }

    setMarkedDates(newMarkedDates);
  }, [selectedDate]);

  const handleDateSelect = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setPickerVisible(false);
  };

  const renderHeader = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${year}. ${month}`;

    return (
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => setPickerVisible(true)}
          style={styles.headerTouchable}
        >
          <ThemedText type="titleLarge" style={{ color: Colors.light.black }}>
            {formattedDate}
          </ThemedText>
          <Feather name="chevron-down" size={20} color={"black"} />
        </TouchableOpacity>
        {today && (
          <TouchableOpacity
            style={styles.todayButton}
            onPress={() => {
              const currentDate = new Date();
              setSelectedDate(today);
              setSelectedYear(currentDate.getFullYear());
              setSelectedMonth(currentDate.getMonth() + 1);
            }}
          >
            <ThemedText type="footnote" style={styles.todayButtonText}>
              TODAY
            </ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Calendar
        key={`${selectedYear}-${selectedMonth}`}
        current={`${selectedYear}-${String(selectedMonth).padStart(2, "0")}-01`}
        hideArrows={true}
        style={{
          paddingTop: 0,
        }}
        markingType={"custom"}
        markedDates={markedDates}
        onDayPress={(day: DateData) => {
          setSelectedDate(day.dateString);
        }}
        renderHeader={renderHeader}
        theme={{
          todayTextColor: Colors.light.tint,
        }}
      />

      {selectedDate && (
        <ThemedView style={styles.recordContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {records.filter((record) => record.date === selectedDate).length >
            0 ? (
              <ThemedView style={styles.recordList}>
                {records
                  .filter((record) => record.date === selectedDate)
                  .map((record, index) => (
                    <ThemedView key={index} style={styles.recordItem}>
                      <ClickBox
                        title={record.content}
                        timeRange={record.timeRange}
                      />
                    </ThemedView>
                  ))}
              </ThemedView>
            ) : (
              <ThemedView style={styles.noRecordContainer}>
                <ThemedText
                  type="callout"
                  style={{ color: Colors.light.lowGray }}
                >
                  기록이 없습니다
                </ThemedText>
              </ThemedView>
            )}
          </ScrollView>
        </ThemedView>
      )}

      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <ThemedView style={styles.pickerHeader}>
              <ThemedText type="callout">날짜 선택</ThemedText>
              <TouchableOpacity
                onPress={() => setPickerVisible(false)}
                style={styles.closeButton}
              >
                <ThemedText type="callout" style={styles.closeButtonText}>
                  닫기
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.pickerContainer}>
              <ScrollView style={styles.pickerColumn}>
                {years.map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.pickerItem,
                      selectedYear === year && styles.pickerItemSelected,
                    ]}
                    onPress={() => handleDateSelect(year, selectedMonth)}
                  >
                    <ThemedText
                      type="callout"
                      style={[
                        selectedYear === year && styles.pickerItemTextSelected,
                      ]}
                    >
                      {year}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView style={styles.pickerColumn}>
                {months.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={[
                      styles.pickerItem,
                      selectedMonth === month && styles.pickerItemSelected,
                    ]}
                    onPress={() => handleDateSelect(selectedYear, month)}
                  >
                    <ThemedText
                      type="callout"
                      style={[
                        selectedMonth === month &&
                          styles.pickerItemTextSelected,
                      ]}
                    >
                      {month}월
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
  },

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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxHeight: "70%",
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: Colors.light.tint,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerColumn: {
    flex: 1,
    maxHeight: 300,
  },
  pickerItem: {
    padding: 15,
    alignItems: "center",
  },
  pickerItemSelected: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  pickerItemTextSelected: {
    color: Colors.light.tint,
    fontWeight: "600",
  },
  recordContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  recordHeader: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  recordList: {
    paddingTop: 15,
  },
  recordItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  noRecordContainer: {
    paddingTop: 30,
    alignItems: "center",
  },
});
