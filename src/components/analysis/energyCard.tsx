import { Colors } from "@/constants/colors.constant";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
import { StyleSheet, Image } from "react-native";
import CoinImage from "@/assets/images/coin.png";
import AnimatedNumbers from "react-native-animated-numbers";
import { useEffect, useState } from "react";

interface energyCardProps {
  fare: number;
  totalEnergy: number;
  Analogy: string;
}

export const EnergyCard = ({ fare, totalEnergy, Analogy }: energyCardProps) => {
  const [animateToNumber, setAnimateToNumber] = useState(0);
  useEffect(() => {
    setAnimateToNumber(fare);
  }, [fare]);
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.title}>
        <ThemedText type="body">전력사용량</ThemedText>
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            justifyContent: "center",
          }}
        >
          <AnimatedNumbers
            includeComma
            animateToNumber={animateToNumber}
            fontStyle={{
              fontSize: 17,
              fontWeight: "600",
              lineHeight: 22,
              fontFamily: "LGEIHeadline-SemiBold",
            }}
          />
          <ThemedText type="headline">원</ThemedText>
        </ThemedView>
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
