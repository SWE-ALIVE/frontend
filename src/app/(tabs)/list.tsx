import { FlatList, StyleSheet } from "react-native";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import DeviceList, { DeviceListProp } from "@/components/list/deviceList";
import { useQuery } from "@tanstack/react-query";
import { getUserDevices } from "@/service/device.service";
import { useUserStore } from "@/stores/useUserStore";

export default function ListScreen() {
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
  const deviceList =
    userDevices?.map((device) => ({
      category: device.category,
      name: device.deviceName,
      id: device.deviceId,
    })) || [];
  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>로딩중...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>에러가 발생했습니다.{error.message}</ThemedText>
      </ThemedView>
    );
  }
  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <ThemedText type="title1">가전제품 목록</ThemedText>
        <ThemedView
          style={{ marginBottom: 24, flexDirection: "column", gap: 8 }}
        ></ThemedView>
        <ThemedView>
          <FlatList
            data={deviceList}
            scrollEnabled={false}
            renderItem={({ item }) => <DeviceList {...item} />}
            ItemSeparatorComponent={() => (
              <ThemedView
                style={{ backgroundColor: Colors.light.lightGray, height: 0.5 }}
              />
            )}
            keyExtractor={(device) => device.id}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
// const dummyDevices: DeviceListProp[] = [
//   {
//     category: "WASHING_MACHINE",
//     name: "LG 통돌이 세탁기",
//     id: "1",
//   },
//   {
//     category: "DRYER",
//     name: "LG 트롬 오브제컬렉션 건조기",
//     id: "2",
//   },
//   {
//     category: "REFRIGERATOR",
//     name: "LG 디오스 오브제컬렉션 빌트인 타입",
//     id: "3",
//   },
//   {
//     category: "AIR_CONDITIONER",
//     name: "LG 휘센 벽걸이에어컨",
//     id: "4",
//   },
//   {
//     category: "TV",
//     name: "LG 울트라 HD TV (스탠드형)",
//     id: "5",
//   },
// ];
