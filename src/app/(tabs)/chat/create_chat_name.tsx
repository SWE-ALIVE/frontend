import { AppBar } from "@/components/common/AppBar";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { createChatRoom } from "@/service/chat.service";
import { UserDevice } from "@/service/device.service";
import { sendMessage } from "@/service/message.service";
import { useUserStore } from "@/stores/useUserStore";
import Feather from "@expo/vector-icons/Feather";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Alert, StyleSheet, TextInput, TextInputProps } from "react-native";
interface MessageBody {
  channel_url: string;
  user_id: string;
  message: string;
}
export default function CreateChatNameScreen() {
  const params = useLocalSearchParams<{ selectedDevices: string }>();
  const router = useRouter();
  const [chatName, setChatName] = useState("");
  const selectedDevices: UserDevice[] = useMemo(() => {
    if (!params.selectedDevices) return [];
    return JSON.parse(params.selectedDevices);
  }, [params.selectedDevices]);
  const userId = useUserStore((state) => state.user?.id);

  // const createChatMutation = useMutation({
  //   mutationFn: async () => {
  //     if (!userId) throw new Error("User ID is required");
  //     const deviceIds = [
  //       ...selectedDevices.map((device) => device.device_id),
  //       userId,
  //     ];
  //     return createChatRoom(chatName, deviceIds, [userId]);
  //   },
  //   onSuccess: async (data) => {
  //     console.log(data.id);
  //     // 채팅방 생성 성공 후 메시지 전송
  //     try {
  //       const messageBody: MessageBody = {
  //         channel_url: data.id,
  //         user_id: data.channelDevices[0].id,
  //         message: "미세먼지가 많은데, 공기청정을 실행할까요?",
  //       };
  //       const response = await sendMessage(messageBody);
  //       console.log("채팅방 생성 시 메세지 보내기 성공!", response);
  //     } catch (error) {
  //       console.log("초기 메시지 전송 실패:", error);
  //     }

  //     router.push("/chat");
  //   },
  //   onError: (error) => {
  //     Alert.alert(
  //       "오류",
  //       "채팅방 생성 중 오류가 발생했습니다. 다시 시도해주세요."
  //     );
  //   },
  // });
  const createChatMutation = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const deviceIds = [
        ...selectedDevices.map((device) => device.device_id),
        userId,
      ];
      return createChatRoom(chatName, deviceIds, [userId]);
    },
    onSuccess: async (data) => {
      // 채팅방 생성 성공 후 메시지 전송
      try {
        if (!data.id || !data.channelDevices[0]?.id) {
          throw new Error("Required data is missing");
        }

        const messageBody: MessageBody = {
          channel_url: data.id,
          user_id: userId ? userId : "",
          message: "채팅을 시작합니다.",
        };

        console.log("Sending message with body:", messageBody); // 요청 데이터 로깅
        const response = await sendMessage(messageBody);
        console.log("채팅방 생성 시 메세지 보내기 성공!", response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("초기 메시지 전송 실패 상세:", {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
            body: error.config?.data, // 실제 보낸 요청 바디
          });
        } else {
          console.log("초기 메시지 전송 실패:", error);
        }
      }

      router.push("/chat");
    },
    onError: (error) => {
      Alert.alert(
        "오류",
        "채팅방 생성 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    },
  });
  console.log(
    "Channel Devices Detail:",
    JSON.stringify(createChatMutation.data, null, 2)
  );
  useFocusEffect(
    useCallback(() => {
      setChatName("");
    }, [])
  );
  const mainId = createChatMutation.data?.id;
  const deviceIds = createChatMutation.data?.channelDevices.map(
    (device) => device.id
  );
  const sendChat = async () => {
    // mainId와 deviceIds가 있는지 확인
    if (!mainId || !deviceIds || deviceIds.length === 0) {
      console.log("Required data is missing");
      return;
    }

    const message: MessageBody = {
      channel_url: mainId,
      message: "안녕하세요? 채팅을 시작해보세요!",
      user_id: deviceIds[0], // deviceIds의 첫 번째 값 사용
    };

    try {
      const response = await sendMessage(message);
      console.log("채팅방 생성 시 메세지 보내기 성공!", response); // response 사용
    } catch (error) {
      console.log(error);
    }
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
                  chatName.length === 0
                    ? Colors.light.textDisabled
                    : Colors.light.black
                }
              >
                확인
              </ThemedText>
            ),
            onPress: () => {
              if (chatName.length === 0) return;
              createChatMutation.mutate();
            },
          },
        ]}
      />
      <ThemedView
        style={{
          marginTop: 24,
          marginHorizontal: 16,
          flex: 1,
          position: "relative",
        }}
      >
        <ThemedText type="title3" style={{ marginBottom: 24 }}>
          채팅방의 이름을 설정해주세요
        </ThemedText>
        <StyledInput
          value={chatName}
          onChangeText={(text) => setChatName(text)}
          placeholder="안방"
        />
      </ThemedView>
      <ThemedText type="subhead" style={styles.lengthText}>
        {chatName.length} / 10
      </ThemedText>
    </ThemedView>
  );
}

interface StyledInputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  validate?: (value: string) => boolean;
  error?: boolean;
}

function StyledInput({
  value,
  onChangeText,
  label,
  validate = () => true,
  secureTextEntry = false,
  error = false,
  ...props
}: StyledInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChangeText = (text: string) => {
    if (text.length > 10) return;
    setIsValid(validate(text));
    onChangeText?.(text);
  };

  const getBorderColor = () => {
    if (error) return Colors.light.tint;
    if (isFocused) return Colors.light.black;
    if (!value) return Colors.light.lightGray;
    return Colors.light.black;
  };

  return (
    <ThemedView style={styles.container}>
      {label && (
        <ThemedText type="footnote" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <ThemedView style={{ height: 40 }}>
        <TextInput
          style={[styles.input, { borderBottomColor: getBorderColor() }]}
          value={value}
          onChangeText={handleChangeText}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          secureTextEntry={secureTextEntry}
          {...props}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#374151",
  },
  input: {
    height: "100%",
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize: 18,
    lineHeight: 22,
  },
  lengthText: {
    position: "absolute", // 절대 위치
    right: 16,
    top: 198,
    color: Colors.light.textDisabled,
  },
});
