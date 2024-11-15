import { IconProps } from "@/types/icon";
import * as React from "react";
import Svg, { Path, Polyline } from "react-native-svg";
const SyncIcon = ({ color, height, width, strokeWidth = 2 }: IconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
  >
    <Polyline points="23 4 23 10 17 10" />
    <Polyline points="1 20 1 14 7 14" />
    <Path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </Svg>
);
export default SyncIcon;
