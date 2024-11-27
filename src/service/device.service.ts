import { Member } from "@/types/device";
import { instance, sendbird_instance } from "./axios-instance";

interface getDeviceResponse {
  members: Member[];
}

export const getDevices = async (): Promise<getDeviceResponse> => {
  const res = await sendbird_instance("/channels/living_room/users");
  return res.data;
};
export interface Device {
  category: DeviceCategory;
  deviceName: string;
}

export interface UserDevice {
  category: DeviceCategory;
  device_id: string;
  name: string;
  nickname: string;
}

export type DeviceCategory =
  | "WASHING_MACHINE"
  | "DRYER"
  | "REFRIGERATOR"
  | "AIR_CONDITIONER"
  | "TV"
  | "HUMIDIFIER"
  | "AIR_PURIFIER"
  | "OVEN"
  | "KIMCHI_REFRIGERATOR"
  | "VACUUM_CLEANER";
interface ChatRoom {
  chatRoomName: string;
  chatRoomDevices: string[];
}

interface Action {
  action_description: string;
  // usageDate: string;
  start_time: string;
  end_time: string;
}

export interface DeviceUsage {
  deviceName: string;
  channels: Channel[];
  actions: Action[];
}

interface Channel {
  channel_name: string;
  channel_id: string;
  channel_devices: string[];
}

interface Action {
  action_description: string;
  // usageDate: string;
  start_time: string;
  end_time: string;
}
export const getDeviceUsage = async (
  userId: string,
  deviceId: string
): Promise<DeviceUsage> => {
  const response = await instance.post("/v1/device-usage", {
    user_id: userId,
    device_id: deviceId,
  });
  return response.data;
};
export const getUserDevices = async (userId: string): Promise<UserDevice[]> => {
  const response = await instance.get(`/v1/devices/users/${userId}`);

  return response.data;
};
