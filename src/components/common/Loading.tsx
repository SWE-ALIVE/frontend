import { Colors } from "@/constants/colors.constant";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
interface LoadingProps {
  isLoading: boolean;
  duration?: number;
}

const gifUrl =
  "https://www.lg.com/content/dam/lge/global/our-brand/src/mocks/bs0002/lg_electronics_expressive_symbol_transparent_white_appearing.gif";

export const Loading = ({ isLoading, duration = 2000 }: LoadingProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + 0.01;
          return nextProgress > 1 ? 1 : nextProgress;
        });
      }, duration / 1000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.backdrop}>
      <Image
        source={{ uri: gifUrl }}
        style={styles.loadingImage}
        resizeMode="contain"
      />
      <Progress.Bar
        progress={progress}
        width={280}
        color={Colors.light.tint}
        unfilledColor={Colors.light.background}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingImage: {
    width: 192,
    height: 192,
  },
});
