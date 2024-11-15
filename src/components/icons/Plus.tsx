import { IconProps } from "@/types/icon";
import * as React from "react";
import Svg, { Line } from "react-native-svg";
const PlusIcon = ({ color, height, width, strokeWidth = 2 }: IconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
  >
    <Line x1="12" x2="12" y1="5" y2="19" />
    <Line x1="5" x2="19" y1="12" y2="12" />
  </Svg>
);
export default PlusIcon;
