import { Message, MessageBody } from "@/types/chat";
import { sendbird_instance } from "./axios-instance";

export const sendMessage = async (message: MessageBody): Promise<Message> => {
  const response = await sendbird_instance.post("/channels/messages", message);
  return response.data;
};
