import { IconProps } from "@/types/icon";
import AirConditioner from "./AirConditioner";
import Dryer from "./Dryer";
import Refrigerator from "./Refrigerator";
import Tv from "./Tv";
import WashingMachine from "./WashingMachine";

export const DeviceMap: Record<string, React.FC<IconProps>> = {
  "air-conditioner": AirConditioner,
  dryer: Dryer,
  refrigerator: Refrigerator,
  tv: Tv,
  "washing-machine": WashingMachine,
};

export const DeviceNameMap: Record<keyof typeof DeviceMap, string> = {
  "air-conditioner": "에어컨",
  dryer: "건조기",
  refrigerator: "냉장고",
  tv: "텔레비전",
  "washing-machine": "세탁기",
};
