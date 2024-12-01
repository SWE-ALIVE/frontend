import { AppBar } from "@/components/common/AppBar";
import { Loading } from "@/components/common/Loading";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/colors.constant";
import { createChatRoom } from "@/service/chat.service";
import { UserDevice } from "@/service/device.service";
import { sendNormalMessage } from "@/service/message.service";
import { useUserStore } from "@/stores/useUserStore";
import Feather from "@expo/vector-icons/Feather";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const [chatName, setChatName] = useState("");
  const selectedDevices: UserDevice[] = useMemo(() => {
    if (!params.selectedDevices) return [];
    return JSON.parse(params.selectedDevices);
  }, [params.selectedDevices]);
  const userId = useUserStore((state) => state.user?.id);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      try {
        if (!data.id || !data.channelDevices[0]?.id) {
          throw new Error("Required data is missing");
        }

        const messageBody: MessageBody = {
          channel_url: data.id,
          user_id: userId ? userId : "",
          message: "채팅을 시작합니다.",
        };

        await sendNormalMessage(messageBody);
        queryClient.refetchQueries({
          queryKey: ["channels"],
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("초기 메시지 전송 실패 상세:", {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
            body: error.config?.data,
          });
        } else {
          console.log("초기 메시지 전송 실패:", error);
        }
      }
      setIsLoading(false);
      router.push("/chat");
    },
    onError: (error) => {
      Alert.alert(
        "오류",
        "채팅방 생성 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    },
  });

  useFocusEffect(
    useCallback(() => {
      setChatName("");
    }, [])
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <Loading isLoading={isLoading} duration={2000} />
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
    position: "absolute",
    right: 16,
    top: 198,
    color: Colors.light.textDisabled,
  },
});
