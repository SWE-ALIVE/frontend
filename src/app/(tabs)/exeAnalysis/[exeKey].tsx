import { useLocalSearchParams } from "expo-router";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedView } from "@/components/common/ThemedView";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/colors.constant";
import { EnergyCard } from "@/components/analysis/energyCard";
import { ContentBox } from "@/components/analysis/contentBox";
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

export default function ExeAnalysisDetail() {
  const {
    day,
    content,
    exeHistory: exeHistoryString,
    exeKey,
  } = useLocalSearchParams();

  function formatDateToKorean(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = "";
    if (hours > 0) result += `${hours}시간 `;
    if (minutes > 0) result += `${minutes}분 `;
    if (remainingSeconds > 0) result += `${remainingSeconds}초`;

    return result.trim();
  };

  const formattedDay = formatDateToKorean(day as string);
  const exeHistory = JSON.parse(exeHistoryString as string) as ExeHistory[];
  const totalWh = exeHistory.reduce(
    (sum, history) => sum + history.eleUsage.Wh,
    0
  );
  const totalFare = exeHistory.reduce(
    (sum, history) => sum + history.eleUsage.fare,
    0
  );
  const totalDuration = exeHistory.reduce(
    (sum, history) => sum + history.duration,
    0
  );
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={(styles.section, { flexDirection: "column", gap: 4 })}>
        <ThemedText type="body">
          {formattedDay} | {formatDuration(totalDuration)}
        </ThemedText>
        <ThemedText type="title1">{content}</ThemedText>
        <ThemedText type="body">주어진 임무를 완벽하게 마쳤어요!</ThemedText>
      </ThemedView>
      <ThemedView style={{ alignItems: "center", marginVertical: 32 }}>
        <EnergyCard
          fare={totalFare}
          totalEnergy={totalWh}
          Analogy="막대사탕 1개"
        />
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="headline" style={{ marginBottom: 16 }}>
          실행 이력
        </ThemedText>
        <ThemedView style={styles.contentSection}>
          {exeHistory.map((history, index) => (
            <ContentBox
              key={index}
              mode={history.name}
              startTime={history.startTime}
              endTime={history.endTime}
              duration={history.duration}
              status={history.status}
            />
          ))}
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.bottomText}>
        <ThemedText type="body">이만큼 썼어요 !</ThemedText>
        <ThemedText type="headline" style={{ marginTop: 4 }}>
          {formatDuration(totalDuration)}
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 16,
  },
  contentSection: {
    marginVertical: 4,
    gap: 16,
  },
  bottomText: {
    alignItems: "center",
    marginBottom: 42,
  },
});
