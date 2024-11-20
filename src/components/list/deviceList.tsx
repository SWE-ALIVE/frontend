import { Colors } from "@/constants/colors.constant";
import { DeviceIconMap, TranslateDeviceName } from "@/types/device";
import React, { useEffect, useState } from "react";
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
      params: { appKey, category, translatedCategory, name },
    });
  };
  const [isClicked, setIsClicked] = useState(false);

  const IconComponent = DeviceIconMap[category];

  const iconBackgroundColor = useSharedValue(Colors.light.tint);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (category === "REFRIGERATOR") {
      setIsLoading(true);
    }
  }, [category]);
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(iconBackgroundColor.value, { duration: 300 }),
    };
  });

  return (
    <Pressable
      onPress={handlePress}
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <ThemedView style={styles.card}>
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
          <IconComponent
            width={24}
            height={24}
            color={Colors.light.background}
          />
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
      </ThemedView>
      {isLoading && (
        <ThemedView
          style={{
            paddingRight: 8,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ThemedText type="footnote" style={{ color: Colors.light.lowGray }}>
            실행중
          </ThemedText>
          <ThemedView>
            <ThemedView
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: Colors.light.lowGray,
                marginTop: 4,
              }}
            ></ThemedView>
          </ThemedView>
        </ThemedView>
      )}
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
