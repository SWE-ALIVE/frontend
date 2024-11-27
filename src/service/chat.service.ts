import { instance } from "./axios-instance";

export interface CreateChatRoomRequest {
  name: string;
  device_ids: string[];
  operator_ids: string[];
}

export interface ChannelDevice {
  id: string;
  device_status: boolean;
}

export interface CreateChatRoomResponse {
  id: string;
  name: string;
  channelDevices: ChannelDevice[];
}

export const createChatRoom = async (
  name: string,
  device_ids: string[],
  operator_ids: string[]
): Promise<CreateChatRoomResponse> => {
  const response = await instance.post("/v1/channels", {
    name: name,
    device_ids: device_ids,
    operator_ids: operator_ids,
  });
  return response.data;
};
