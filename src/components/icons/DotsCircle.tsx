import * as React from "react";
import Svg, { Circle } from "react-native-svg";

interface IconProps {
  color: string;
  width: number;
  height: number;
}

const DotsCircle = ({ width, height, color }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Circle cx={24} cy={24} r={23.5} stroke={color} strokeDasharray="5 6" />
  </Svg>
);
export default DotsCircle;
