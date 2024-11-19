import { Modal, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { ClickBox } from "@/components/common/ClickBox";
import { ThemedView } from "@/components/common/ThemedView";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/colors.constant";
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
type Record = {
  title: string;
  date: string;
  content: string;
  exeHistory: ExeHistory[];
  exekey: string;
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
      title: "에어컨 실행",
      date: "2024-11-20",
      content: "에어컨의 대활약",
      exeHistory: [
        {
          name: "파워냉방모드",
          startTime: "2024-11-20 09:00:00",
          endTime: "2024-11-20 10:30:00",
          status: "success",
          duration: 5400,
          eleUsage: {
            Wh: 2000,
            fare: 300,
          },
        },
        {
          name: "열대야모드",
          startTime: "2024-11-20 13:00:00",
          endTime: "2024-11-20 14:30:00",
          status: "success",
          duration: 5400,
          eleUsage: {
            Wh: 1800,
            fare: 270,
          },
        },
      ],
      exekey: "WM_20241120_0900",
    },
    {
      title: "건조기 실행",
      date: "2024-11-20",
      content: "모조리 다 말려버리겠어!",
      exeHistory: [
        {
          name: "표준건조",
          startTime: "2024-11-20 15:00:00",
          endTime: "2024-11-20 16:00:00",
          status: "running",
          duration: 3600,
          eleUsage: {
            Wh: 2500,
            fare: 375,
          },
        },
      ],
      exekey: "DR_20241120_1500",
    },
    {
      title: "로봇청소기 실행",
      date: "2024-11-02",
      content: "전체 청소",
      exeHistory: [
        {
          name: "자동청소",
          startTime: "2024-11-02 11:00:00",
          endTime: "2024-11-02 11:45:00",
          status: "fail",
          duration: 2700,
          eleUsage: {
            Wh: 500,
            fare: 75,
          },
        },
      ],
      exekey: "RC_20241102_1100",
    },
    {
      title: "세탁기 실행",
      date: "2024-11-18",
      content: "섬세 세탁 코스",
      exeHistory: [
        {
          name: "섬세세탁",
          startTime: "2024-11-18 07:30:00",
          endTime: "2024-11-18 08:30:00",
          status: "success",
          duration: 3600,
          eleUsage: {
            Wh: 1500,
            fare: 225,
          },
        },
      ],
      exekey: "WM_20241118_0730",
    },
    {
      title: "건조기 실행",
      date: "2024-11-18",
      content: "",
      exeHistory: [
        {
          name: "속건조",
          startTime: "2024-11-18 09:00:00",
          endTime: "2024-11-18 09:45:00",
          status: "success",
          duration: 2700,
          eleUsage: {
            Wh: 1200,
            fare: 180,
          },
        },
      ],
      exekey: "DR_20241118_0900",
    },
    {
      title: "공기청정기 실행",
      date: "2024-11-19",
      content: "오염도 제거 모드",
      exeHistory: [
        {
          name: "고속정화",
          startTime: "2024-11-19 12:00:00",
          endTime: "2024-11-19 13:00:00",
          status: "success",
          duration: 3600,
          eleUsage: {
            Wh: 800,
            fare: 120,
          },
        },
      ],
      exekey: "AP_20241119_1200",
    },
    {
      title: "로봇청소기 실행",
      date: "2024-11-19",
      content: "거실 청소",
      exeHistory: [
        {
          name: "거실청소",
          startTime: "2024-11-19 14:00:00",
          endTime: "2024-11-19 14:30:00",
          status: "success",
          duration: 1800,
          eleUsage: {
            Wh: 300,
            fare: 45,
          },
        },
      ],
      exekey: "RC_20241119_1400",
    },
    {
      title: "에어컨 실행",
      date: "2024-11-10",
      content: "냉방 모드",
      exeHistory: [
        {
          name: "쿨링",
          startTime: "2024-11-10 10:00:00",
          endTime: "2024-11-10 11:00:00",
          status: "success",
          duration: 3600,
          eleUsage: {
            Wh: 3500,
            fare: 525,
          },
        },
      ],
      exekey: "AC_20241110_1000",
    },
    {
      title: "세탁기 실행",
      date: "2024-11-25",
      content: "표준 세탁 코스",
      exeHistory: [
        {
          name: "표준세탁",
          startTime: "2024-11-25 08:00:00",
          endTime: "2024-11-25 09:30:00",
          status: "success",
          duration: 5400,
          eleUsage: {
            Wh: 1900,
            fare: 285,
          },
        },
        {
          name: "강력세척",
          startTime: "2024-11-25 14:00:00",
          endTime: "2024-11-25 15:30:00",
          status: "success",
          duration: 5400,
          eleUsage: {
            Wh: 2000,
            fare: 300,
          },
        },
      ],
      exekey: "WM_20241125_0800",
    },
    {
      title: "공기청정기 실행",
      date: "2024-11-25",
      content: "야간 모드",
      exeHistory: [
        {
          name: "저속정화",
          startTime: "2024-11-25 22:00:00",
          endTime: "2024-11-25 23:00:00",
          status: "success",
          duration: 3600,
          eleUsage: {
            Wh: 500,
            fare: 75,
          },
        },
      ],
      exekey: "AP_20241125_2200",
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
                        title={record.title}
                        content={record.content}
                        exeHistory={record.exeHistory}
                        exekey={record.exekey}
                        day={selectedDate}
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
    paddingVertical: 4,
  },
  noRecordContainer: {
    paddingTop: 30,
    alignItems: "center",
  },
});
