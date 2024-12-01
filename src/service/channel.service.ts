import { instance } from "./axios-instance";

// export interface Channel {
//   channel_url: string;
//   name: string;
//   cover_url: string;
//   member_count: number;
//   joined_member_count: number;
//   unread_message_count: number;
//   last_message: Message;
// }

// interface Response {
//   channels: Channel[];
// }

export type UserChatRooms = ChatRoom[];

export interface ChatRoom {
  channel_id: string;
  channel_name: string;
  devices: Device[];
}

export interface Device {
  id: string;
  category: string;
  name: string;
  nickname: string;
  device_status: boolean;
}
export interface Root {
  channels: Channel[];
  next: string;
  ts: number;
}

export interface Channel {
  channel_url: string;
  name: string;
  cover_url: string;
  data: string;
  member_count: number;
  joined_member_count: number;
  max_length_message: number;
  created_at: number;
  custom_type: string;
  is_distinct: boolean;
  is_super: boolean;
  is_broadcast: boolean;
  is_public: boolean;
  is_discoverable: boolean;
  freeze: boolean;
  is_ephemeral: boolean;
  unread_message_count: number;
  unread_mention_count: number;
  ignore_profanity_filter: boolean;
  has_ai_bot: boolean;
  has_bot: boolean;
  id: string;
  channel: Channel2;
  created_by: any;
  disappearing_message: DisappearingMessage;
  is_access_code_required: boolean;
  is_exclusive: boolean;
  message_survival_seconds: number;
  sms_fallback: SmsFallback;
  inviter: any;
  invited_at: number;
  last_message: LastMessage;
  joined_ts: any;
}

export interface Channel2 {
  channel_url: string;
  name: string;
  cover_url: string;
  data: string;
  created_at: number;
  custom_type: string;
  max_length_message: number;
  member_count: number;
}

export interface DisappearingMessage {
  is_triggered_by_message_read: boolean;
  message_survival_seconds: number;
}

export interface SmsFallback {
  wait_seconds: number;
  exclude_user_ids: any[];
}

export interface LastMessage {
  type: string;
  message_id: number;
  message: string;
  data: string;
  custom_type: string;
  file: File;
  created_at: number;
  user: User;
  channel_url: string;
  updated_at: number;
  message_survival_seconds: number;
  mentioned_users: any[];
  mention_type: string;
  silent: boolean;
  message_retention_hour: number;
  channel_type: string;
  translations: Translations;
  is_removed: boolean;
  is_op_msg: boolean;
  message_events: MessageEvents;
}

export interface File {}

export interface User {
  user_id: string;
  profile_url: string;
  require_auth_for_profile_image: boolean;
  nickname: string;
  metadata: Metadata;
  role: string;
  is_active: boolean;
}

export interface Metadata {}

export interface Translations {}

export interface MessageEvents {
  send_push_notification: string;
  update_unread_count: boolean;
  update_mention_count: boolean;
  update_last_message: boolean;
}

export const getChannels = async (userId: string): Promise<Root> => {
  try {
    const response = await instance.get(`/v1/channels/users/${userId}/details`);
    return response.data;
  } catch (error: any) {
    console.error("Error details:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
    throw error;
  }
};

export const getChatRoom = async (userId: string): Promise<UserChatRooms> => {
  const response = await instance.get(`/v1/channels/users/${userId}`);

  return response.data;
};
