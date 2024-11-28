import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { getUserDevices, UserDevice } from "@/service/device.service";
import { useUserStore } from "@/stores/useUserStore";
import { TranslateDeviceName } from "@/types/device";
import Feather from "@expo/vector-icons/Feather";
import { useQuery } from "@tanstack/react-query";
import Checkbox from "expo-checkbox";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Image, StyleSheet } from "react-native";

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
    setSelectedDevices((prev) =>
      prev.some((d) => d.device_id === device.device_id)
        ? prev.filter((d) => d.device_id !== device.device_id)
        : [...prev, device]
    );
  };

  useFocusEffect(
    useCallback(() => {
      setSelectedDevices([]);
    }, [])
  );

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
      <ThemedView>
        {isSelected ? (
          <Image
            source={{
              uri: "data:image/gif;base64,R0lGODlhoADwAIABAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDhGNTY1NzlBNUFEMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDhGNTY1N0FBNUFEMTFFRjkzNTRBRTdFOUQ0M0ZDNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowOEY1NjU3N0E1QUQxMUVGOTM1NEFFN0U5RDQzRkM2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowOEY1NjU3OEE1QUQxMUVGOTM1NEFFN0U5RDQzRkM2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTD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",
            }}
            style={styles.loadingImage}
            resizeMode="contain"
          />
        ) : (
          <></>
        )}
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
  loadingImage: {
    width: 160,
    height: 40,
  },
});
