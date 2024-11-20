import Svg, { G, Mask, Path } from "react-native-svg";

interface IconProps {
  color: string;
  width: number;
  height: number;
}

const RefrigeratorIcon = ({ width, height, color }: IconProps) => (
  <Svg width={width} height={height} fill="none">
    <Mask
      id="a"
      width={17}
      height={22}
      x={3}
      y={1}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill={color}
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.5 2h-12a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"
      />
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.5 11h14"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.5 10v2m14-2v2"
      />
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7.5 14.5v2m0-11v2"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16.5 20v2m-10-2v2"
      />
    </Mask>
    <G mask="url(#a)">
      <Path fill={color} d="M0 0h24v24H0V0Z" />
    </G>
  </Svg>
);
export default RefrigeratorIcon;
