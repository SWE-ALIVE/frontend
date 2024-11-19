import Svg, { Path } from "react-native-svg";

interface IconProps {
  color: string;
  width: number;
  height: number;
}

const WashingMachineIcon = ({ width, height, color }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      fill={color}
      d="M14.83 11.17a4.01 4.01 0 0 1 0 5.66 4.01 4.01 0 0 1-5.66 0l5.66-5.66ZM6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm2 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
    />
  </Svg>
);
export default WashingMachineIcon;
