import * as d3 from "d3";
import React from "react";

import { ConfigData } from "../../config";
import { QuadrantConfig } from "../../model/model";

const arcAngel = [
  [(3 * Math.PI) / 2, (4 * Math.PI) / 2],
  [0, Math.PI / 2],
  [Math.PI, (Math.PI * 3) / 2],
  [Math.PI / 2, Math.PI],
];

function arcPath(
  quadrantPosition: number,
  ringPosition: number,
  xScale: d3.ScaleLinear<number, number>,
  config: ConfigData
) {
  const [startAngle, endAngle] = arcAngel[quadrantPosition - 1];
  const arcAttrs = config.chartConfig.ringsAttributes[ringPosition],
    ringRadiusPx = xScale(arcAttrs.radius) - xScale(0),
    arc = d3.arc();

  return (
    arc({
      innerRadius: ringRadiusPx - arcAttrs.arcWidth,
      outerRadius: ringRadiusPx,
      startAngle,
      endAngle,
    }) || undefined
  );
}

function fillArc(
  ringPosition: number,
  xScale: d3.ScaleLinear<number, number>,
  config: ConfigData
) {
  console.log("fill arc");

  const arcAttrs = config.chartConfig.ringsAttributes[ringPosition],
    ringRadiusPx = xScale(arcAttrs.radius) - xScale(0);
  const arcPoint = 45 / 100 * (ringRadiusPx);

  return `M 0 ${ringRadiusPx} C 0 ${arcPoint} ${arcPoint} 0 ${ringRadiusPx} 0 L ${ringRadiusPx} ${ringRadiusPx} L 0 ${ringRadiusPx} Z`;
}

function transform(
  ringPosition: number,
  xScale: d3.ScaleLinear<number, number>,
  quadrantPosition: number,
  config: ConfigData) {
  const arcAttrs = config.chartConfig.ringsAttributes[ringPosition],
    ringRadiusPx = xScale(arcAttrs.radius) - xScale(0);

  const matrixs = [
    `translate(${(config.chartConfig.size / 2) - ringRadiusPx},${(config.chartConfig.size / 2) - ringRadiusPx})`,
    `matrix(0, 1, -1, 0, ${config.chartConfig.size / 2 + ringRadiusPx}, ${config.chartConfig.size / 2 - ringRadiusPx})`,
    `matrix(0, -1, 1, 0, ${config.chartConfig.size / 2 - ringRadiusPx}, ${config.chartConfig.size / 2 + ringRadiusPx})`,
    `matrix(-1, 0, 0, -1, ${config.chartConfig.size / 2 + ringRadiusPx}, ${config.chartConfig.size / 2 + ringRadiusPx})`,
  ]

  return matrixs[quadrantPosition - 1]
}

const QuadrantRings: React.FC<{
  quadrant: QuadrantConfig;
  xScale: d3.ScaleLinear<number, number>;
  config: ConfigData;
}> = ({ quadrant, xScale, config }) => {
  // order from top-right clockwise
  const gradientAttributes = [
    { x: 0, y: 0, cx: 1, cy: 1, r: 1 },
    { x: xScale(0), y: 0, cx: 0, cy: 1, r: 1 },
    { x: 0, y: xScale(0), cx: 1, cy: 0, r: 1 },
    { x: xScale(0), y: xScale(0), cx: 0, cy: 0, r: 1 },
  ];
  const gradientId = `${quadrant.position}-radial-gradient`,
    quadrantSize = config.chartConfig.size / 2;
  const ringColors = ["#84BFA4", "#248EA6", "#F2A25C", "#F25244"].reverse()
  return (
    <g className="quadrant-ring">
      {/* Definition of the quadrant gradient */}
      {/* <defs>
        <radialGradient
          id={gradientId}
          {...gradientAttributes[quadrant.position - 1]}
        >
          <stop offset="0%" stopColor={quadrant.colour}></stop>
          <stop
            offset="100%"
            stopColor={quadrant.colour}
            stopOpacity="0"
          ></stop>
        </radialGradient>
      </defs> */}

      {/* Gradient background area */}
      <rect
        width={quadrantSize}
        height={quadrantSize}
        x={gradientAttributes[quadrant.position - 1].x}
        y={gradientAttributes[quadrant.position - 1].y}
        fill={`url(#${gradientId})`}
        style={{ opacity: 0.5 }}
      />
      {/* Rings' arcs */}
      {Array.from(config.rings).reverse().map((ringPosition, index) => (
        <path
          key={index}
          fill={ringColors[index]}
          d={fillArc(3 - index, xScale, config)}
          transform={transform(3 - index, xScale, quadrant.position, config)}
        />
      ))}

      {/* {Array.from(config.rings).map((ringPosition, index) => (
        <path
          key={index}
          fill={quadrant.colour}
          d={arcPath(quadrant.position, index, xScale, config)}
          style={{
            transform: `translate(${quadrantSize}px, ${quadrantSize}px)`,
          }}
        />
      ))} */}
    </g>
  );
};

export default QuadrantRings;
