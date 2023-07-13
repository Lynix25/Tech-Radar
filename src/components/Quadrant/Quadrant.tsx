import { ConfigData, translate } from "../../config";
import { Group, Item } from "../../model/model";
import Badge from "../Badge/Badge";
import BlipPoints from "./BlipPoints2";
import QuadrantRings from "./QuadrantRings2";
import Flag from "../Flag/Flag";
import ItemList from "../ItemList/ItemList";
import Link from "../Link/Link";
import "./quadrant.scss";
import * as d3 from "d3";
import ReactTooltip from "react-tooltip";
import { Legend } from "../Chart/Legend";

const renderList = (
  ringName: string,
  quadrantName: string,
  groups: Group,
  config: ConfigData,
  big: boolean
) => {
  const itemsInRing = groups[quadrantName][ringName] || [];

  if (big) {
    return (
      <ItemList items={itemsInRing} noLeadingBorder>
        <Badge type={ringName} big={big} config={config}>
          {ringName}
        </Badge>
      </ItemList>
    );
  }

  return (
    <div className="ring-list">
      <div className="ring-list__header">
        <Badge type={ringName} config={config}>
          {ringName}
        </Badge>
      </div>
      {itemsInRing.map((item) => (
        <span key={item.name} className="ring-list__item">
          <Link className="link" pageName={`${item.quadrant}/${item.name}`}>
            {item.title}
            <Flag item={item} short />
          </Link>
        </span>
      ))}
    </div>
  );
};

const renderRing = (
  ringName: string,
  quadrantName: string,
  groups: Group,
  config: ConfigData,
  big: boolean
) => {
  if (
    !config.showEmptyRings &&
    (!groups[quadrantName] ||
      !groups[quadrantName][ringName] ||
      groups[quadrantName][ringName].length === 0)
  ) {
    return null;
  }
  return (
    <div key={ringName} className="quadrant-section__ring">
      {renderList(ringName, quadrantName, groups, config, big)}

    </div>
  );
};

export default function Quadrant({
  quadrantName,
  groups,
  config,
  items,
  big = false,
}: {
  quadrantName: string;
  groups: Group;
  config: ConfigData;
  items: Item[];
  big?: boolean;
}) {
  const yScale = d3
    .scaleLinear()
    .domain(config.chartConfig.scale)
    .range([config.chartConfig.size, 0]);

  const xScale = d3
    .scaleLinear()
    .domain(config.chartConfig.scale)
    .range([0, config.chartConfig.size]);
  return (
    <>
      <div className="radar-grid" style={{ maxWidth: config.chartConfig.size / 1.5}}>
        <svg viewBox={`0 0 ${config.chartConfig.size / 2} ${config.chartConfig.size / 2}`}>
          <QuadrantRings
            key={1}
            quadrant={config.quadrantsMap[quadrantName]}
            xScale={xScale}
            config={config}
          />

          <BlipPoints
            quadrantName={quadrantName}
            items={items}
            xScale={xScale}
            yScale={yScale}
            config={config}
          />
        </svg>
        <ReactTooltip className="tooltip" offset={{ top: -5 }} />
        <Legend direction={"row"}  />
      </div>
    </>
  );
}
