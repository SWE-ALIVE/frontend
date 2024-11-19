import { DeviceMap, DeviceNameMap } from "@/components/icons/devices/devices";
import { Colors } from "@/constants/colors.constant";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
export interface DeviceCardProps {
  category: keyof typeof DeviceMap;
  name: string;
  id: string;
  disabled?: boolean;
}

const DeviceCard = ({ category, name }: DeviceCardProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const IconComponent = DeviceMap[category];

  const iconBackgroundColor = useSharedValue(Colors.light.tint);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(iconBackgroundColor.value, { duration: 300 }),
    };
  });

  const handleClick = () => {
    setIsClicked(!isClicked);
    iconBackgroundColor.value = isClicked
      ? Colors.light.tint
      : Colors.light.lightGray;
  };

  return (
    <Pressable onPress={handleClick} style={styles.card}>
      <Animated.View
        style={[
          {
            width: 48,
            height: 48,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 999,
            marginRight: 12,
          },
          animatedBackgroundStyle,
        ]}
      >
        <IconComponent width={24} height={24} color={Colors.light.background} />
      </Animated.View>
      <ThemedView style={{ flexDirection: "column" }}>
        <ThemedText
          type="subhead"
          color={isClicked ? Colors.light.lightGray : Colors.light.black}
        >
          {DeviceNameMap[category]}
        </ThemedText>
        <ThemedText
          type="body"
          color={isClicked ? Colors.light.lightGray : Colors.light.lowGray}
        >
          {name}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DeviceCard;
