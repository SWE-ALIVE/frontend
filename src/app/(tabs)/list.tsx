import { Loading } from "@/components/common/Loading";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import DeviceList from "@/components/list/deviceList";
import { Colors } from "@/constants/colors.constant";
import { getUserDevices } from "@/service/device.service";
import { useUserStore } from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { FlatList, ScrollView, StyleSheet } from "react-native";

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
        <Loading isLoading={true} />
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
    <ScrollView style={styles.container}>
      <ThemedView>
        <ThemedView style={{ marginBottom: 24 }}>
          <ThemedText type="title1">가전제품 목록</ThemedText>
        </ThemedView>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
