import { FlatList, StyleSheet } from "react-native";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import DeviceList, { DeviceListProp } from "@/components/list/deviceList";

export default function ListScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <ThemedText type="title1">가전제품 목록</ThemedText>
        <ThemedView
          style={{ marginBottom: 24, flexDirection: "column", gap: 8 }}
        ></ThemedView>
        <ThemedView>
          <FlatList
            data={dummyDevices}
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
const dummyDevices: DeviceListProp[] = [
  {
    category: "WASHING_MACHINE",
    name: "LG 통돌이 세탁기",
    id: "1",
  },
  {
    category: "DRYER",
    name: "LG 트롬 오브제컬렉션 건조기",
    id: "2",
  },
  {
    category: "REFRIGERATOR",
    name: "LG 디오스 오브제컬렉션 빌트인 타입",
    id: "3",
  },
  {
    category: "AIR_CONDITIONER",
    name: "LG 휘센 벽걸이에어컨",
    id: "4",
  },
  {
    category: "TV",
    name: "LG 울트라 HD TV (스탠드형)",
    id: "5",
  },
];
