import { Member } from "@/types/device";
import { sendbird_instance } from "./axios-instance";

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
  chatRoom_name: string;
  chatRoom_device: string[];
}

interface Action {
  action_description: string;
  usage_date: string;
  start_time: string;
  end_time: string;
}

export interface DeviceUsageResponse {
  device_name: string;
  chatRoom: ChatRoom[];
  action: Action[];
}

interface ErrorResponse {
  status: string;
  message: string;
  error_code: number;
}

interface DeviceUsageRequest {
  user_id: number;
  device_id: number;
}

export const getDeviceUsage = async (
  userId: number,
  deviceId: number
): Promise<DeviceUsageResponse> => {
  const requestBody: DeviceUsageRequest = {
    user_id: userId,
    device_id: deviceId,
  };

  const response = await sendbird_instance.post(
    "/v1/device-usage",
    requestBody
  );
  return response.data;
};
