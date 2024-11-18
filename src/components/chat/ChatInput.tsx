import { Colors } from "@/constants/colors.constant";
import { Message, MessageBody } from "@/types/chat";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ChatInputProps {
  appendMessage: (newMessage: Message) => void;
}

export const ChatInput = ({ appendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState<MessageBody>({
    message: "",
    channel_id: "",
    user_id: "",
  });
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  const borderWidthAnim = useRef(new Animated.Value(0)).current;

  const sendChat = async () => {
    try {
      // const res = await sendMessage(message);
      const exampleMessage: Message = {
        type: "MESG",
        message_id: 7701692635,
        message: message.message,
        created_at: 1731754566120,
        user: {
          user_id: "operator001",
          profile_url: "",
          require_auth_for_profile_image: false,
          nickname: "전등",
          role: "operator",
          is_active: true,
        },
        channel_url: "living_room",
        mentioned_users: [],
        mention_type: "users",
        silent: false,
        is_op_msg: true,
        message_events: {
          send_push_notification: "receivers",
          update_unread_count: true,
          update_mention_count: true,
          update_last_message: true,
        },
      };

      appendMessage(exampleMessage);
      setMessage((prev) => ({ ...prev, message: "" }));
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
