import { Colors } from "@/constants/colors.constant";
import {
  AIMessageBody,
  sendAIMessage,
  sendNormalMessage,
} from "@/service/message.service";
import { useContextStore } from "@/stores/useContextStore";
import { Message, MessageBody } from "@/types/chat";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ChatInputProps {
  message: MessageBody;
  setMessage: React.Dispatch<React.SetStateAction<MessageBody>>;
  appendMessage: (newMessage: Message) => void;
  sys: (string | undefined)[];
}

export const ChatInput = ({
  message,
  setMessage,
  appendMessage,
  sys,
}: ChatInputProps) => {
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  const borderWidthAnim = useRef(new Animated.Value(0)).current;
  const queryClient = useQueryClient();
  const { setContexts, contexts } = useContextStore();
  const sendChat = async () => {
    try {
      setMessage((prev) => ({ ...prev, message: "" }));
      const AIMessage: AIMessageBody = {
        channel_url: message.channel_url,
        dialog: { sys: sys, usr: [message.message] },
        slot_values: contexts,
      };
      const userRes = await sendNormalMessage(message);
      appendMessage(userRes);
      const aiRes = await sendAIMessage(AIMessage);

      if (aiRes.context) {
        setContexts(aiRes.context);
      }

      queryClient.refetchQueries({
        queryKey: ["channels", "messages"],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const toValue = message.message === "" ? 0 : 1;
    Animated.timing(backgroundColorAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(borderWidthAnim, {
      toValue: message.message === "" ? 0 : 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [message]);

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#EDEDED", Colors.light.background],
  });

  const borderWidth = borderWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedInputContainer,
          {
            backgroundColor,
            borderWidth,
            borderColor: "#000",
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: message.message === "" ? "#CACACA" : Colors.light.black,
            },
          ]}
          onChangeText={(text) =>
            setMessage((prev) => ({ ...prev, message: text }))
          }
          value={message.message}
          placeholder="메시지를 입력하세요"
          placeholderTextColor="#CACACA"
        />
      </Animated.View>
      <TouchableOpacity
        onPress={sendChat}
        style={[
          styles.sendButton,
          {
            backgroundColor:
              message.message === ""
                ? Colors.light.background
                : Colors.light.black,
            borderColor:
              message.message === "" ? Colors.light.tint : Colors.light.black,
          },
        ]}
      >
        {message.message === "" ? (
          <Feather name="mic" size={24} color={Colors.light.tint} />
        ) : (
          <Feather name="arrow-up" size={24} color={Colors.light.background} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  animatedInputContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 32,
  },
  input: {
    flex: 1,
  },
  sendButton: {
    width: 48,
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    marginLeft: 8,
    borderWidth: 1,
  },
});
