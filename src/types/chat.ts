export interface Message {
  type: string;
  message_id: number;
  message: string;
  created_at: number;
  channel_url: string;
  mentioned_users: any[];
  mention_type: string;
  silent: boolean;
  is_op_msg: boolean;
  message_events: MessageEvents;
  user: User;
}

export interface User {
  user_id: string;
  profile_url: string;
  require_auth_for_profile_image: boolean;
  nickname: string;
  role: "operator" | null;
  is_active: boolean;
}

export interface MessageEvents {
  send_push_notification: string;
  update_unread_count: boolean;
  update_mention_count: boolean;
  update_last_message: boolean;
}
