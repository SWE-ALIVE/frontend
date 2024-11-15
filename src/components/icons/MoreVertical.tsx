import { IconProps } from "@/types/icon";
import * as React from "react";
import Svg, { Circle } from "react-native-svg";
const MoreVerticalIcon = ({
  color,
  height,
  width,
  strokeWidth = 2,
}: IconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
  >
    <Circle cx={12} cy={12} r={1} />
    <Circle cx={12} cy={5} r={1} />
    <Circle cx={12} cy={19} r={1} />
  </Svg>
);
export default MoreVerticalIcon;
