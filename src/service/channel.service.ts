import { Message } from "@/types/chat";
import { sendbird_instance } from "./axios-instance";

export interface Channel {
  channel_url: string;
  name: string;
  cover_url: string;
  member_count: number;
  joined_member_count: number;
  unread_message_count: number;
  last_message: Message;
}

interface Response {
  channels: Channel[];
}

export const getChannels = async (userId: string): Promise<Response> => {
  const response = await sendbird_instance.get(`/channels`, {
    params: {
      userId: userId,
    },
  });
  return response.data;
};
