import AirConditioner from "@/components/icons/devices/AirConditioner";
import Dryer from "@/components/icons/devices/Dryer";
import Refrigerator from "@/components/icons/devices/Refrigerator";
import Tv from "@/components/icons/devices/Tv";
import WashingMachine from "@/components/icons/devices/WashingMachine";
import { IconProps } from "@/types/icon";

export const DeviceIconMap: Record<DeviceCategory, React.FC<IconProps>> = {
  AIR_CONDITIONER: AirConditioner,
  DRYER: Dryer,
  REFRIGERATOR: Refrigerator,
  TV: Tv,
  WASHING_MACHINE: WashingMachine,
  HUMIDIFIER: () => null, // Add appropriate component
  AIR_PURIFIER: () => null, // Add appropriate component
  OVEN: () => null, // Add appropriate component
  KIMCHI_REFRIGERATOR: () => null, // Add appropriate component
  VACUUM_CLEANER: () => null, // Add appropriate component
};

export const TranslateDeviceName: Record<keyof typeof DeviceIconMap, string> = {
  AIR_CONDITIONER: "에어컨",
  DRYER: "건조기",
  REFRIGERATOR: "냉장고",
  TV: "TV",
  WASHING_MACHINE: "세탁기",
  HUMIDIFIER: "가습기",
  AIR_PURIFIER: "공기청정기",
  OVEN: "오븐",
  KIMCHI_REFRIGERATOR: "김치냉장고",
  VACUUM_CLEANER: "진공청소기",
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

export interface Member {
  user_id: string;
  nickname: string;
  profile_url: string;
  last_seen_at: number;
  state: string;
  joined_ts: number;
  role: string;
}
