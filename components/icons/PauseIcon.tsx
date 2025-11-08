import * as React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";

const PauseIcon = ({ fill = "#ffffff", ...props }: SvgProps) => (
  <Svg
    width="800px"
    height="800px"
    viewBox="0 0 36 36"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <Rect x={6} y={4} width={7} height={28} fill={fill} />
    <Rect x={23} y={4} width={7} height={28} fill={fill} />
  </Svg>
);
export default PauseIcon;
