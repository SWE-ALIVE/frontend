import { IconProps } from "@/types/icon";
import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ProfileIcon = ({ color, height, width }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      fill={color}
      d="M12.5 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12.5 14.5c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5Z"
    />
  </Svg>
);
export default ProfileIcon;
