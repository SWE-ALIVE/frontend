import { Modal, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedView } from "@/components/common/ThemedView";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/colors.constant";

interface DatePickerModalProps {
  visible: boolean;
  selectedYear: number;
  selectedMonth: number;
  onClose: () => void;
  onDateSelect: (year: number, month: number) => void;
}

export const DatePickerModal = ({
  visible,
  selectedYear,
  selectedMonth,
  onClose,
  onDateSelect,
}: DatePickerModalProps) => {
  const years = Array.from({ length: 11 }, (_, i) => selectedYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedView style={styles.pickerHeader}>
            <ThemedText type="callout">날짜 선택</ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
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
                  onPress={() => onDateSelect(year, selectedMonth)}
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
                  onPress={() => onDateSelect(selectedYear, month)}
                >
                  <ThemedText
                    type="callout"
                    style={[
                      selectedMonth === month && styles.pickerItemTextSelected,
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
  );
};

const styles = StyleSheet.create({
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
});
