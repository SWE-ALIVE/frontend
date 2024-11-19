import Svg, { Path } from "react-native-svg";

interface IconProps {
  color: string;
  width: number;
  height: number;
}

const AirConditionerIcon = ({ width, height, color }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      fill={color}
      fillRule="evenodd"
      d="M19 6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h14Zm0 8H5a1 1 0 0 0-.993.883L4 15v1h16v-1a1 1 0 0 0-.883-.993L19 14Zm-1-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default AirConditionerIcon;
