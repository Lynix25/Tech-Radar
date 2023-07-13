import React from "react";

import { ConfigData } from "../../config";
import { Blip } from "../../model/model";

type VisualBlipProps = {
  className: string;
  fill: string;
  "data-background-color": string;
  "data-text-color": string;
  "data-tip": string;
  key: number;
};

export const ChangedBlip: React.FC<
  { blip: Blip; config: ConfigData } & VisualBlipProps
> = ({ blip, config, ...props }) => {
  const centeredX = blip.coordinates.x - config.chartConfig.blipSize / 2,
    centeredY = blip.coordinates.y - config.chartConfig.blipSize / 2;

  return (
    <rect
      transform={`rotate(-45 ${centeredX} ${centeredY})`}
      x={centeredX}
      y={centeredY}
      width={config.chartConfig.blipSize}
      height={config.chartConfig.blipSize}
      rx="3"
      style={{ fill: "black" }}
      {...props}
    />
  );
};

export const NewBlip: React.FC<
  { blip: Blip; config: ConfigData } & VisualBlipProps
> = ({ blip, config, ...props }) => {
  const centeredX = blip.coordinates.x - config.chartConfig.blipSize / 2,
    centeredY = blip.coordinates.y - config.chartConfig.blipSize / 2;

  /*
    The below is a predefined path of a triangle with rounded corners.
    I didn't find any more human friendly way of doing this as all examples I found have tons of lines of code
    e.g. https://observablehq.com/@perlmonger42/interactive-rounded-corners-on-svg-polygons-using-d3-js
    */
  return (
    <path
      style={{ fill: "black" }}
      transform={`translate(${centeredX}, ${centeredY})`}
      d="M.247 10.212l5.02-8.697a2 2 0 013.465 0l5.021 8.697a2 2 0 01-1.732 3H1.98a2 2 0 01-1.732-3z"
      {...props}
    />
  );
};

export const RecomendedBlip: React.FC<
  { blip: Blip; config: ConfigData } & VisualBlipProps
> = ({ blip, config, ...props }) => {
  const centeredX = blip.coordinates.x - config.chartConfig.blipSize / 2,
    centeredY = blip.coordinates.y - config.chartConfig.blipSize / 2;

  return (
    <path
      style={{ fill: "black" }}
      transform={`translate(${centeredX}, ${centeredY})`}
      d="M 8 1 L 10.181 3.72 L 13.614 3.773 L 12.9 7.218 L 15 10.004 L 11.929 11.579 L 11.115 15.001 L 8 13.521 L 4.885 15.001 L 4.071 11.579 L 1 10.004 L 3.1 7.218 L 2.386 3.773 L 5.819 3.72 Z"
      {...props}
    />
  );
};

export const DefaultBlip: React.FC<
  { blip: Blip; config: ConfigData } & VisualBlipProps
> = ({ blip, config, ...props }) => {
  return (
    <circle
      style={{ fill: "black" }}
      r={config.chartConfig.blipSize / 2}
      cx={blip.coordinates.x}
      cy={blip.coordinates.y}
      {...props}
    />
  );
};
