import { Message, MessageBody } from "@/types/chat";
import { sendbird_instance } from "./axios-instance";

export const sendMessage = async (message: MessageBody): Promise<Message> => {
  const response = await sendbird_instance.post("/channels/messages", message);
  return response.data;
};

interface GetMessageRequest {
  channel_url: string;
  limit: number;
}
interface GetMessageResponse {
  messages: Message[];
}

export const getMessages = async (
  message_request: GetMessageRequest
): Promise<GetMessageResponse> => {
  const response = await sendbird_instance.post(`/channels/messages/query`, {
    channel_url: message_request.channel_url,
    limit: message_request.limit,
    message_ts: "",
  });
  return response.data;
};
