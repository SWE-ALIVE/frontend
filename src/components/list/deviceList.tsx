import { Colors } from "@/constants/colors.constant";
import { DeviceIconMap, TranslateDeviceName } from "@/types/device";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemedView } from "../common/ThemedView";
import { ThemedText } from "../common/ThemedText";
import { useRouter } from "expo-router";

export interface DeviceListProp {
  category: keyof typeof DeviceIconMap;
  name: string;
  id: string;
  disabled?: boolean;
}

const DeviceList = ({ category, name, id }: DeviceListProp) => {
  const appKey = id;
  const router = useRouter();
  const translatedCategory = TranslateDeviceName[category];
  const handlePress = () => {
    router.push({
      pathname: "/appDetail/[appKey]",
      params: { appKey, translatedCategory, name },
    });
  };
  const [isClicked, setIsClicked] = useState(false);

  const IconComponent = DeviceIconMap[category];

  const iconBackgroundColor = useSharedValue(Colors.light.tint);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(iconBackgroundColor.value, { duration: 300 }),
    };
  });

  return (
    <Pressable onPress={handlePress} style={styles.card}>
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
          {TranslateDeviceName[category]}
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

export default DeviceList;
