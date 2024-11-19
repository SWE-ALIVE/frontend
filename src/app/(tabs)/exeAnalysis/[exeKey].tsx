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

  const formattedDay = formatDateToKorean(day as string); // 날짜 포맷 적용
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
      <ThemedView style={styles.section}>
        <ThemedText type="body">
          {formattedDay} | {formatDuration(totalDuration)}
        </ThemedText>
        <ThemedText type="title1">{content}</ThemedText>
        <ThemedText type="body">주어진 임무를 완벽하게 마쳤어요!</ThemedText>
      </ThemedView>
      <ThemedView
        style={{ alignItems: "center", marginTop: 48, marginBottom: 16 }}
      >
        <EnergyCard
          fare={totalFare}
          totalEnergy={totalWh}
          Analogy="막대사탕 1개"
        />
      </ThemedView>
      <ThemedView style={styles.section}></ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="headline" style={styles.sectionTitle}>
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
    padding: 24,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  // infoBox: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   backgroundColor: "#F8F8F8",
  //   padding: 20,
  //   borderRadius: 16,
  // },
  // infoItem: {
  //   alignItems: "center",
  //   gap: 8,
  // },
  // historyItem: {
  //   backgroundColor: "#F8F8F8",
  //   padding: 20,
  //   borderRadius: 16,
  //   marginBottom: 12,
  // },
  // historyHeader: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: 8,
  // },
  // status: {
  //   fontWeight: "600",
  // },
  // duration: {
  //   color: Colors.light.lowGray,
  // },
  contentSection: {
    marginVertical: 4,
    gap: 16,
  },
  bottomText: {
    alignItems: "center",
    marginBottom: 42,
  },
});
// import { useLocalSearchParams } from "expo-router";
// import { StyleSheet, ScrollView } from "react-native";
// import { ThemedView } from "@/components/common/ThemedView";
// import { ThemedText } from "@/components/common/ThemedText";
// import { Colors } from "@/constants/colors.constant";

// interface ExeHistory {
//   startTime: string;
//   duration: number;
//   name: string;
//   status: "success" | "failure";
// }

// export default function ExeAnalysisDetail() {
//   const {
//     day,
//     content,
//     exeHistory: exeHistoryString,
//     exeKey,
//   } = useLocalSearchParams();

//   const exeHistory = JSON.parse(exeHistoryString as string) as ExeHistory[];

//   return (
//     <ScrollView style={styles.container}>
//       <ThemedView style={styles.section}>
//         <ThemedText type="body">{day}</ThemedText>
//         <ThemedText type="title1">{content}</ThemedText>
//         <ThemedText type="body">주어진 임무를 완벽하게 마쳤어요!</ThemedText>
//       </ThemedView>

//       <ThemedView style={styles.section}>
//         <ThemedText type="headline" style={styles.sectionTitle}>
//           실행 이력
//         </ThemedText>
//         {exeHistory.map((history, index) => (
//           <ThemedView key={index} style={styles.historyItem}>
//             <ThemedView style={styles.historyHeader}>
//               <ThemedText type="headline">{history.name}</ThemedText>
//               <ThemedText
//                 type="callout"
//                 style={[
//                   styles.status,
//                   {
//                     color:
//                       history.status === "success"
//                         ? Colors.light.tint
//                         : Colors.light.black,
//                   },
//                 ]}
//               >
//                 {history.status === "success" ? "성공" : "실패"}
//               </ThemedText>
//             </ThemedView>
//             <ThemedText type="body" style={styles.duration}>
//               실행 시간: {Math.floor(history.duration / 60)}분
//             </ThemedText>
//           </ThemedView>
//         ))}
//       </ThemedView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     padding: 24,
//   },
//   section: {
//     marginBottom: 32,
//   },
//   sectionTitle: {
//     marginBottom: 16,
//   },
//   historyItem: {
//     backgroundColor: "#F8F8F8",
//     padding: 20,
//     borderRadius: 16,
//     marginBottom: 12,
//   },
//   historyHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   status: {
//     fontWeight: "600",
//   },
//   duration: {
//     color: Colors.light.lowGray,
//   },
// });

// // import { useLocalSearchParams } from "expo-router";
// // import { StyleSheet, ScrollView } from "react-native";
// // import { ThemedView } from "@/components/common/ThemedView";
// // import { ThemedText } from "@/components/common/ThemedText";
// // import { Colors } from "@/constants/colors.constant";

// // export default function ExeAnalysisDetail() {
// //   const params = useLocalSearchParams();
// //   const content = params.content as string;
// //   const eleUsageWh = Number(params.eleUsageWh);
// //   const eleUsageFare = Number(params.eleUsageFare);
// //   const exeHistory = JSON.parse(params.exeHistory as string);
// //   console.log(exeHistory);
// //   return (
// //     <ScrollView style={styles.container}>
// //       <ThemedView style={styles.section}>
// //         <ThemedText type="body">
// //           {exeHistory[0].startTime.split(" ")[0].split("-")[0]}년{" "}
// //           {exeHistory[0].startTime.split(" ")[0].split("-")[1]}월{" "}
// //           {exeHistory[0].startTime.split(" ")[0].split("-")[2]}일 |{" "}
// //           {Math.floor(exeHistory[0].duration / 3600)
// //             ? `${Math.floor(exeHistory[0].duration / 3600)}시간 `
// //             : ""}
// //           {Math.floor((exeHistory[0].duration % 3600) / 60)
// //             ? `${Math.floor((exeHistory[0].duration % 3600) / 60)}분 `
// //             : ""}
// //           {exeHistory[0].duration % 60
// //             ? `${exeHistory[0].duration % 60}초`
// //             : ""}
// //         </ThemedText>
// //         <ThemedText type="title1">{content}</ThemedText>
// //         <ThemedText type="body">주어진 임무를 완벽하게 마쳤어요!</ThemedText>
// //       </ThemedView>

// //       <ThemedView style={styles.section}>
// //         <ThemedText type="headline" style={styles.sectionTitle}>
// //           전력 사용량
// //         </ThemedText>
// //         <ThemedView style={styles.infoBox}>
// //           <ThemedView style={styles.infoItem}>
// //             <ThemedText type="body">총 사용량</ThemedText>
// //             <ThemedText type="headline">{eleUsageWh}Wh</ThemedText>
// //           </ThemedView>
// //           <ThemedView style={styles.infoItem}>
// //             <ThemedText type="body">예상 요금</ThemedText>
// //             <ThemedText type="headline">
// //               {eleUsageFare.toLocaleString()}원
// //             </ThemedText>
// //           </ThemedView>
// //         </ThemedView>
// //       </ThemedView>

// //       <ThemedView style={styles.section}>
// //         <ThemedText type="headline" style={styles.sectionTitle}>
// //           실행 이력
// //         </ThemedText>
// //         {exeHistory.map((history: any, index: number) => (
// //           <ThemedView key={index} style={styles.historyItem}>
// //             <ThemedView style={styles.historyHeader}>
// //               <ThemedText type="headline">{history.name}</ThemedText>
// //               <ThemedText
// //                 type="callout"
// //                 style={[
// //                   styles.status,
// //                   {
// //                     color:
// //                       history.status === "success"
// //                         ? Colors.light.tint
// //                         : Colors.light.black,
// //                   },
// //                 ]}
// //               >
// //                 {history.status === "success" ? "성공" : "실패"}
// //               </ThemedText>
// //             </ThemedView>
// //             <ThemedText type="body" style={styles.duration}>
// //               실행 시간: {Math.floor(history.duration / 60)}분
// //             </ThemedText>
// //           </ThemedView>
// //         ))}
// //       </ThemedView>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "white",
// //     padding: 24,
// //   },
// //   section: {
// //     marginBottom: 32,
// //   },
// //   sectionTitle: {
// //     marginBottom: 16,
// //   },
// //   infoBox: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     backgroundColor: "#F8F8F8",
// //     padding: 20,
// //     borderRadius: 16,
// //   },
// //   infoItem: {
// //     alignItems: "center",
// //     gap: 8,
// //   },
// //   historyItem: {
// //     backgroundColor: "#F8F8F8",
// //     padding: 20,
// //     borderRadius: 16,
// //     marginBottom: 12,
// //   },
// //   historyHeader: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 8,
// //   },
// //   status: {
// //     fontWeight: "600",
// //   },
// //   duration: {
// //     color: Colors.light.lowGray,
// //   },
// // });
