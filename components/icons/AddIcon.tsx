import * as React from "react";
import Svg, { Polygon, SvgProps } from "react-native-svg";

const AddIcon = ({ fill = "#000000", ...props }: SvgProps) => (
  <Svg
    fill={fill}
    height="800px"
    width="800px"
    viewBox="0 0 16 16"
    {...props}
  >
    <Polygon
      points="13 7 9 7 9 3 7 3 7 7 3 7 3 9 7 9 7 13 9 13 9 9 13 9 13 7"
    />
  </Svg>
);
export default AddIcon;
