import { ClickBox } from "@/components/common/ClickBox";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { Record } from "@/types/record.types";
import { ScrollView, StyleSheet } from "react-native";

interface RecordListProps {
  records: Record[];
  selectedDate: string;
}

export const RecordList = ({ records, selectedDate }: RecordListProps) => {
  const filteredRecords = records.filter(
    (record) => record.date === selectedDate
  );

  return (
    <ThemedView style={styles.recordContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {filteredRecords.length > 0 ? (
          <ThemedView style={styles.recordList}>
            {filteredRecords.map((record, index) => (
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
            <ThemedText type="callout" style={{ color: Colors.light.lowGray }}>
              기록이 없습니다
            </ThemedText>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  recordContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
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
