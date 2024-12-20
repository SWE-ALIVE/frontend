import Svg, { Path } from "react-native-svg";

interface IconProps {
  color: string;
  width: number;
  height: number;
}

const AirConditionerIcon = ({ width, height, color }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Path
      fill="white"
      d="M23 20v2h-7v-2h2.46L12 4.61c-.19-.47-.5-.85-.94-1.15-.44-.3-.92-.46-1.45-.46-.71 0-1.33.27-1.85.79S7 4.92 7 5.64V9h1c2.21 0 4 1.79 4 4v9H8c.61-.84 1-1.87 1-3 0-2.76-2.24-5-5-5-.71 0-1.39.15-2 .42V9h3V5.64c0-.84.23-1.64.63-2.32.41-.7.96-1.26 1.67-1.69C8 1.21 8.77 1 9.61 1c.94 0 1.79.26 2.55.77.76.51 1.34 1.2 1.71 2.04L20.66 20H23ZM7 19c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3Zm-2 0c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1Z"
    />
  </Svg>
);
export default AirConditionerIcon;
