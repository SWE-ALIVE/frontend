import { Message } from "@/types/chat";

export interface Channel {
  channel_url: string;
  name: string;
  cover_url: string;
  member_count: number;
  joined_member_count: number;
  unread_message_count: number;
  last_message: Message;
}
