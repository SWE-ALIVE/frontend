import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/colors.constant";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DeviceCard, { DeviceCardProps } from "../common/DeviceCard";
import { ThemedView } from "../common/ThemedView";

type ChatModalProps = {
  isVisible: boolean;
  onClose: () => void;
  name: string;
};

export function ChatModal({ isVisible, onClose, name }: ChatModalProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handlePress = (onPress: () => void) => {
    onClose();
    onPress();
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      coverScreen={false}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      style={styles.modal}
      customBackdrop={
        <TouchableOpacity
          style={[
            styles.customBackdrop,
            {
              top: insets.top,
              bottom: insets.bottom,
            },
          ]}
          onPress={onClose}
        />
      }
    >
      <ThemedView
        style={[
          styles.drawerContainer,
          {
            marginTop: insets.top,
          },
        ]}
      >
        <ThemedView style={{ flex: 1 }}>
          <DrawerItem
            icon="chevron-right"
            label={name}
            onPress={() => handlePress(() => router.push("/list"))}
          />
          <DrawerItem
            icon="chevron-right"
            label="가전제품 초대 / 삭제"
            onPress={() => handlePress(() => router.push("/list"))}
          />
          <DrawerItem
            label="대화상대 선택"
            marginBottom={16}
            onPress={() => {}}
          />
          <FlatList
            data={dummyDevices}
            scrollEnabled={false}
            renderItem={({ item }) => <DeviceCard {...item} />}
            ItemSeparatorComponent={() => (
              <ThemedView
                style={{ backgroundColor: Colors.light.lightGray, height: 0.5 }}
              />
            )}
            keyExtractor={(device) => device.id}
          />
        </ThemedView>
        <ThemedView
          style={{
            paddingBottom: 28,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Feather name="log-out" size={24} color={Colors.light.lowGray} />
          <Feather name="bell" size={24} color={Colors.light.lowGray} />
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const DrawerItem = ({
  icon,
  label,
  marginBottom = 32,
  onPress,
}: {
  icon?: keyof typeof Feather.glyphMap | undefined;
  label: string;
  marginBottom?: number;
  onPress: () => void;
}) => {
  return (
    <Pressable style={[styles.drawerItem, { marginBottom }]} onPress={onPress}>
      <ThemedText type="headline" style={{ fontFamily: "LGEIHeadline-Light" }}>
        {label}
      </ThemedText>
      <Feather name={icon} size={24} color={Colors.light.text} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  customBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    flex: 1,
  },
  drawerContainer: {
    flex: 1,
    paddingVertical: 28,
    paddingHorizontal: 20,
    width: "80%",
    backgroundColor: Colors.light.background,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const dummyDevices: DeviceCardProps[] = [
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
