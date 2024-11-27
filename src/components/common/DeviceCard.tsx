import { Colors } from "@/constants/colors.constant";
import { toggleDeviceStatus } from "@/service/device.service";
import { useUserStore } from "@/stores/useUserStore";
import { DeviceIconMap } from "@/types/device";
import { useQueryClient } from "@tanstack/react-query";
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
  category?: keyof typeof DeviceIconMap;
  name: string;
  id: string;
  deviceStatus?: boolean;
  nickname: string;
  channelId: string;
  onToggle?: (isDisabled: boolean) => void;
}

const DeviceCard = ({
  category = "AIR_CONDITIONER",
  name,
  nickname,
  deviceStatus = true,
  onToggle,
  id,
  channelId,
}: DeviceCardProps) => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.user?.id);
  const [isActive, setIsActive] = useState(deviceStatus);
  const [isLoading, setIsLoading] = useState(false);

  const IconComponent = DeviceIconMap[category];

  const iconBackgroundColor = useSharedValue(
    isActive ? Colors.light.tint : Colors.light.lightGray
  );

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(iconBackgroundColor.value, { duration: 300 }),
    };
  });

  const handleToggle = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const newActiveState = !isActive;

      await toggleDeviceStatus({
        channel_id: channelId,
        device_id: id,
        device_status: newActiveState,
      });

      setIsActive(newActiveState);
      iconBackgroundColor.value = newActiveState
        ? Colors.light.tint
        : Colors.light.lightGray;

      onToggle?.(newActiveState);

      // 상태 변경 후 관련 쿼리 무효화
      await queryClient.invalidateQueries({
        queryKey: ["channel", userId],
      });
    } catch (error) {
      console.error("Failed to toggle device status:", error);
      setIsActive(isActive);
      iconBackgroundColor.value = isActive
        ? Colors.light.tint
        : Colors.light.lightGray;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pressable onPress={handleToggle} style={styles.card}>
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
          color={isActive ? Colors.light.lowGray : Colors.light.lightGray}
        >
          {nickname}
        </ThemedText>
        <ThemedText
          type="body"
          color={isActive ? Colors.light.lowGray : Colors.light.lightGray}
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

// import { Colors } from "@/constants/colors.constant";
// import { toggleDeviceStatus } from "@/service/device.service";
// import { DeviceIconMap } from "@/types/device";
// import React, { useState } from "react";
// import { Pressable, StyleSheet } from "react-native";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import { ThemedText } from "./ThemedText";
// import { ThemedView } from "./ThemedView";
// export interface DeviceCardProps {
//   category?: keyof typeof DeviceIconMap;
//   name: string;
//   id: string;
//   deviceStatus?: boolean;
//   nickname: string;
//   channelId: string;
//   onToggle?: (isDisabled: boolean) => void; // 상태 변경 콜백 추가
// }

// const DeviceCard = ({
//   category = "AIR_CONDITIONER",
//   name,
//   nickname,
//   deviceStatus = true,
//   onToggle,
//   id,
//   channelId,
// }: DeviceCardProps) => {
//   const [isActive, setIsActive] = useState(deviceStatus);
//   const [isLoading, setIsLoading] = useState(false);

//   // const [isClicked, setIsClicked] = useState(false);

//   const IconComponent = DeviceIconMap[category];

//   // const iconBackgroundColor = useSharedValue(Colors.light.tint);
//   const iconBackgroundColor = useSharedValue(
//     isActive ? Colors.light.tint : Colors.light.lightGray
//   );
//   const animatedBackgroundStyle = useAnimatedStyle(() => {
//     return {
//       backgroundColor: withTiming(iconBackgroundColor.value, { duration: 300 }),
//     };
//   });
//   // const handleToggle = async () => {
//   //   if (isLoading) return;

//   //   try {
//   //     setIsLoading(true);
//   //     await toggleDeviceStatus({
//   //       channel_id: channelId,
//   //       device_id: id,
//   //       device_status: isActive,
//   //     });

//   //     const newActiveState = !isActive;
//   //     setIsActive(newActiveState);
//   //     iconBackgroundColor.value = newActiveState
//   //       ? Colors.light.tint
//   //       : Colors.light.lightGray;

//   //     onToggle?.(newActiveState);
//   //   } catch (error) {
//   //     console.error("Failed to toggle device status:", error);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   const handleToggle = async () => {
//     if (isLoading) return;

//     try {
//       setIsLoading(true);

//       // 현재 상태의 반대값을 API에 전송
//       const newActiveState = !isActive;

//       await toggleDeviceStatus({
//         channel_id: channelId,
//         device_id: id,
//         device_status: newActiveState, // 변경된 상태를 보냄
//       });

//       // API 호출이 성공한 후에 상태 업데이트
//       setIsActive(newActiveState);
//       iconBackgroundColor.value = newActiveState
//         ? Colors.light.tint
//         : Colors.light.lightGray;

//       onToggle?.(newActiveState);
//     } catch (error) {
//       console.error("Failed to toggle device status:", error);
//       // API 호출이 실패하면 상태를 원래대로 되돌림
//       setIsActive(isActive);
//       iconBackgroundColor.value = isActive
//         ? Colors.light.tint
//         : Colors.light.lightGray;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // const handleClick = () => {
//   //   setIsClicked(!isClicked);
//   //   iconBackgroundColor.value = isClicked
//   //     ? Colors.light.tint
//   //     : Colors.light.lightGray;
//   // };

//   return (
//     <Pressable onPress={handleToggle} style={styles.card}>
//       <Animated.View
//         style={[
//           {
//             width: 48,
//             height: 48,
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 999,
//             marginRight: 12,
//           },
//           animatedBackgroundStyle,
//         ]}
//       >
//         <IconComponent width={24} height={24} color={Colors.light.background} />
//       </Animated.View>
//       <ThemedView style={{ flexDirection: "column" }}>
//         <ThemedText
//           type="subhead"
//           color={isActive ? Colors.light.lowGray : Colors.light.lightGray}
//         >
//           {nickname}
//         </ThemedText>
//         <ThemedText
//           type="body"
//           color={isActive ? Colors.light.lowGray : Colors.light.lightGray}
//         >
//           {name}
//         </ThemedText>
//       </ThemedView>
//     </Pressable>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 8,
//     paddingHorizontal: 4,
//     paddingVertical: 8,
//     flexDirection: "row",
//     alignItems: "center",
//   },
// });

// export default DeviceCard;
