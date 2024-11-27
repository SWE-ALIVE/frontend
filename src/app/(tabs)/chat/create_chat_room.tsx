import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { Device, getUserDevices, UserDevice } from "@/service/device.service";
import { useUserStore } from "@/stores/useUserStore";
import { TranslateDeviceName } from "@/types/device";
import Feather from "@expo/vector-icons/Feather";
import { useQuery } from "@tanstack/react-query";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

export default function CreateChatRoomScreen() {
  const router = useRouter();
  const [selectedDevices, setSelectedDevices] = useState<UserDevice[]>([]);
  const userId = useUserStore((state) => state.user?.id);
  const {
    data: userDevices,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userDevices", userId],
    queryFn: () => {
      if (!userId) throw new Error("User ID is required");
      return getUserDevices(userId);
    },
    enabled: !!userId,
  });
  const toggleDeviceSelection = (device: UserDevice) => {
    setSelectedDevices(
      (prev) =>
        prev.some((d) => d.device_id === device.device_id)
          ? prev.filter((d) => d.device_id !== device.device_id) // 선택 해제
          : [...prev, device] // 선택 추가
    );
  };

  useEffect(() => {
    return () => {
      setSelectedDevices([]);
    };
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <AppBar
        align="left"
        title="채팅방 개설"
        leftIcon={{
          icon: <Feather name="chevron-left" size={24} color={"black"} />,
          onPress: () => router.push("/chat"),
        }}
        rightIcons={[
          {
            icon: (
              <ThemedText
                type="headline"
                color={
                  selectedDevices.length === 0
                    ? Colors.light.textDisabled
                    : Colors.light.black
                }
              >
                다음
              </ThemedText>
            ),
            onPress: () =>
              router.push({
                pathname: "/chat/create_chat_name",
                params: { selectedDevices: JSON.stringify(selectedDevices) },
              }),
            // onPress: () => router.push("/chat/create_chat_name"),
            disabled: selectedDevices.length === 0,
          },
        ]}
      />
      <ThemedView style={{ marginTop: 24, marginHorizontal: 16, flex: 1 }}>
        <ThemedText type="title3">대화할 제품을 선택해주세요</ThemedText>
        <FlatList
          data={userDevices}
          renderItem={({ item }) => (
            <SelectDevice
              device={item}
              isSelected={selectedDevices.some(
                (d) => d.device_id === item.device_id
              )}
              toggleSelection={() => toggleDeviceSelection(item)}
            />
          )}
          keyExtractor={(device) => device.device_id}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => (
            <ThemedView
              style={{ backgroundColor: Colors.light.lightGray, height: 0.5 }}
            />
          )}
        />
        <ThemedView
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 40,
          }}
        >
          <ThemedText type="title3" color={Colors.light.lowGray}>
            찾으시는 제품이 없나요?
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const SelectDevice = ({
  device,
  isSelected,
  toggleSelection,
}: {
  device: UserDevice;
  isSelected: boolean;
  toggleSelection: () => void;
}) => {
  return (
    <ThemedView style={styles.deviceContainer}>
      <ThemedView style={{ flexDirection: "column" }}>
        <ThemedText type="callout" style={{ fontFamily: "LGEIHeadline-Bold" }}>
          {TranslateDeviceName[device.category]}
        </ThemedText>
        <ThemedText type="body">{device.name}</ThemedText>
      </ThemedView>
      <Checkbox
        value={isSelected}
        onValueChange={toggleSelection}
        color={isSelected ? Colors.light.tint : undefined}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  deviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
});

const devices: Device[] = [
  {
    category: "AIR_CONDITIONER",
    deviceName: "LG 통돌기 세탁기",
  },
  {
    category: "DRYER",
    deviceName: "LG 트롬 오브제컬렉션 건조기",
  },
  {
    category: "DRYER",
    deviceName: "LG 디오스 오브제컬렉션 빌트인 타입",
  },
  {
    category: "AIR_CONDITIONER",
    deviceName: "LG 휘센 벽걸이에어컨",
  },
];
