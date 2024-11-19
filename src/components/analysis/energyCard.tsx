import { Colors } from "@/constants/colors.constant";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
import { StyleSheet, Image } from "react-native";
import CoinImage from "@/assets/images/coin.png";

interface energyCardProps {
  fare: number;
  totalEnergy: number;
  Analogy: string;
}
export const EnergyCard = ({ fare, totalEnergy, Analogy }: energyCardProps) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.title}>
        <ThemedText type="body">전력사용량</ThemedText>
        <ThemedText type="headline">{fare}원</ThemedText>
        <ThemedText type="body">{totalEnergy}Wh</ThemedText>
      </ThemedView>
      <ThemedView style={styles.image}>
        <Image source={CoinImage} style={{ width: 105, height: 105 }}></Image>
      </ThemedView>
      <ThemedView style={styles.bottomText}>
        <ThemedText type="body">{Analogy} 금액만큼 사용중</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 304,
    height: 304,
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 24,
  },
  title: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  bottomText: {
    alignItems: "center",
    marginTop: "auto",
  },
  image: {
    alignItems: "center",
    marginTop: "auto",
  },
});
