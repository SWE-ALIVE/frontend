import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/colors.constant";
import { UserChatRooms } from "@/service/channel.service";
import { deleteChatRoom } from "@/service/chat.service";
import { DeviceCategory, DeviceIconMap } from "@/types/device";
import Feather from "@expo/vector-icons/Feather";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DeviceCard from "../common/DeviceCard";
import { Loading } from "../common/Loading";
import { ThemedView } from "../common/ThemedView";

type ChatModalProps = {
  isVisible: boolean;
  onClose: () => void;
  name: string;
  userChatRooms?: UserChatRooms;
  channelUrl: string;
};

export function ChatModal({
  isVisible,
  onClose,
  name,
  userChatRooms,
  channelUrl,
}: ChatModalProps) {
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteChannel = async () => {
    try {
      setIsLoading(true);
      await deleteChatRoom({ channel_id: channelUrl });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      queryClient.refetchQueries({
        queryKey: ["channels"],
      });
      onClose();
      router.push("/(tabs)/chat");
    } catch (error) {
      console.error("채널 삭제 실패:", error);
    }
  };

  const isValidDeviceCategory = (
    category: string
  ): category is DeviceCategory => {
    return Object.keys(DeviceIconMap).includes(category);
  };

  const currentChannelDevices =
    userChatRooms?.find((channel) => channel.channel_name === name)?.devices ||
    [];

  const handlePress = (onPress: () => void) => {
    onClose();
    onPress();
  };

  return (
    <>
      <Loading isLoading={isLoading} duration={1000} />
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
            <DrawerItem label=" 선택" marginBottom={16} onPress={() => {}} />
            <FlatList
              data={currentChannelDevices}
              scrollEnabled={false}
              renderItem={({ item }) => {
                const deviceCategory = isValidDeviceCategory(item.category)
                  ? item.category
                  : "AIR_CONDITIONER";
                return (
                  <DeviceCard
                    channelId={channelUrl}
                    id={item.id}
                    name={item.name}
                    category={deviceCategory}
                    nickname={item.nickname}
                    deviceStatus={item.device_status}
                  />
                );
              }}
              ItemSeparatorComponent={() => (
                <ThemedView
                  style={{
                    backgroundColor: Colors.light.lightGray,
                    height: 0.5,
                  }}
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
            <TouchableOpacity onPress={handleDeleteChannel}>
              <Feather name="log-out" size={24} color={Colors.light.lowGray} />
            </TouchableOpacity>
            <Feather name="bell" size={24} color={Colors.light.lowGray} />
          </ThemedView>
        </ThemedView>
      </Modal>
    </>
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
