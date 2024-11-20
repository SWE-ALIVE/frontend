import { Message, MessageBody } from "@/types/chat";
import { sendbird_instance } from "./axios-instance";

export const sendMessage = async (message: MessageBody): Promise<Message> => {
  console.log(message);

  const response = await sendbird_instance.post("/messages", message);
  return response.data;
};

interface GetMessageRequest {
  channel_url: string;
  limit?: number;
  message_ts?: number | "";
}
interface GetMessageResponse {
  messages: Message[];
}

export const getMessages = async (
  message_request: GetMessageRequest
): Promise<GetMessageResponse> => {
  const response = await sendbird_instance.post(
    `/messages/query`,
    message_request
  );

  return response.data;
};
