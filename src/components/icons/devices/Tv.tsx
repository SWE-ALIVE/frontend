import Svg, { Path } from "react-native-svg";

interface IconProps {
  color: string;
  width: number;
  height: number;
}

const TvIcon = ({ width, height, color }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path fill="#fff" d="M1 2h22v17h-4.754L12 12.76 5.755 19H1V2Z" />
    <Path
      fill="#fff"
      d="M12 15.587 7.76 19.83l-2.42 2.414h2.833L12 18.416l3.83 3.828h2.832L12 15.587Z"
    />
  </Svg>
);
export default TvIcon;
