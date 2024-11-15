import { IconProps } from "@/types/icon";
import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BellIcon = ({ color, height, width, strokeWidth = 2 }: IconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
  >
    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
  </Svg>
);
export default BellIcon;
