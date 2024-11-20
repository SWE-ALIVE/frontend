import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { Device } from "@/service/device.service";
import { TranslateDeviceName } from "@/types/device";
import Feather from "@expo/vector-icons/Feather";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

export default function CreateChatRoomScreen() {
  const router = useRouter();
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  const toggleDeviceSelection = (device: Device) => {
    setSelectedDevices(
      (prev) =>
        prev.some((d) => d.deviceName === device.deviceName)
          ? prev.filter((d) => d.deviceName !== device.deviceName) // 선택 해제
          : [...prev, device] // 선택 추가
    );
  };

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
            onPress: () => router.push("/chat/create_chat_name"),
            disabled: selectedDevices.length === 0,
          },
        ]}
      />
      <ThemedView style={{ marginTop: 24, marginHorizontal: 16, flex: 1 }}>
        <ThemedText type="title3">대화할 제품을 선택해주세요</ThemedText>
        <FlatList
          data={devices}
          renderItem={({ item }) => (
            <SelectDevice
              device={item}
              isSelected={selectedDevices.some(
                (d) => d.deviceName === item.deviceName
              )}
              toggleSelection={() => toggleDeviceSelection(item)}
            />
          )}
          keyExtractor={(device) => device.deviceName}
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
  device: Device;
  isSelected: boolean;
  toggleSelection: () => void;
}) => {
  return (
    <ThemedView style={styles.deviceContainer}>
      <ThemedView style={{ flexDirection: "column" }}>
        <ThemedText type="callout" style={{ fontFamily: "LGEIHeadline-Bold" }}>
          {TranslateDeviceName[device.category]}
        </ThemedText>
        <ThemedText type="body">{device.deviceName}</ThemedText>
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
