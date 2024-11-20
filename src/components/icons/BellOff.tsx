import { IconProps } from "@/types/icon";
import * as React from "react";
import Svg, { Line, Path } from "react-native-svg";
const BellOffIcon = ({ color, height, width, strokeWidth = 2 }: IconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
  >
    <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
    <Path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
    <Path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" />
    <Path d="M18 8a6 6 0 0 0-9.33-5" />
    <Line x1="1" x2="23" y1="1" y2="23" />
  </Svg>
);
export default BellOffIcon;
