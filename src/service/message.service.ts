import { DEVICE } from "@/constants/devices.constant";
import { Message, MessageBody } from "@/types/chat";
import { instance, sendbird_instance } from "./axios-instance";

interface Dialog {
  sys: (string | undefined)[];
  usr: string[];
}

interface SlotValue {
  domain: DEVICE;
  slot: string;
  value: string;
}

export interface AIMessageBody {
  channel_url: string;
  dialog: Dialog;
  slot_values: Context[];
}

export interface AIMessage {
  domain: string;
  message: string;
}

export interface Context {
  domain: string;
  slot: string;
  value: string;
}

export interface AIMessageResponse {
  messages: AIMessage[];
  context: Context[];
}
export const sendAIMessage = async (
  message: AIMessageBody
): Promise<AIMessageResponse> => {
  const response = await instance.post("/v1/ai/messages", message);
  return response.data;
};

export const sendNormalMessage = async (
  message: MessageBody
): Promise<Message> => {
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
