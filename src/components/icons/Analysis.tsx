import { IconProps } from "@/types/icon";
import * as React from "react";
import Svg, { Path } from "react-native-svg";
const AnalysisIcon = ({ color, height, width }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.32 12c2.6 0 3.68-1 2.72-4.28-.65-2.21-2.55-4.11-4.76-4.76C13 2 12 3.08 12 5.68v2.88C12 11 13 12 15 12h3.32Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 14.7a9.091 9.091 0 0 1-10.42 7.17c-3.79-.61-6.84-3.66-7.46-7.45A9.1 9.1 0 0 1 9.26 4.01"
    />
  </Svg>
);
export default AnalysisIcon;
