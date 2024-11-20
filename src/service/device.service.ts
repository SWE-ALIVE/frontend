import { Member } from "@/types/device";
import { sendbird_instance } from "./axios-instance";

interface getDeviceResponse {
  members: Member[];
}

export const getDevices = async (): Promise<getDeviceResponse> => {
  const res = await sendbird_instance("/channels/living_room/users");
  return res.data;
};
