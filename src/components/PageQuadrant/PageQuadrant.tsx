import React from "react";

import { ConfigData, translate } from "../../config";
import { Item, featuredOnly, groupByQuadrants } from "../../model/model";
import Fadeable from "../Fadeable/Fadeable";
import HeadlineGroup from "../HeadlineGroup/HeadlineGroup";
import HeroHeadline from "../HeroHeadline/HeroHeadline";
import QuadrantSection from "../QuadrantSection/QuadrantSection";
import SetTitle from "../SetTitle";
import QuadrantRings from "../Chart/QuadrantRings";
import Quadrant from "../Quadrant/Quadrant";

type PageQuadrantProps = {
  leaving: boolean;
  onLeave: () => void;
  pageName: string;
  items: Item[];
  config: ConfigData;
};

export default function PageQuadrant({
  leaving,
  onLeave,
  pageName,
  items,
  config,
}: PageQuadrantProps) {
  const groups = groupByQuadrants(featuredOnly(items));
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle title={translate(config, pageName)} />
      <HeadlineGroup>
        <HeroHeadline>{translate(config, pageName)}</HeroHeadline>
      </HeadlineGroup>

      <div className="split" style={{ alignItems:"start"}}>
        <div className="split__left" style={{width:"65%"}}>
          <QuadrantSection
            groups={groups}
            quadrantName={pageName}
            config={config}
            big
          />
        </div>
        <div className="split__right" style={{width:"35%"}}>
          <Quadrant quadrantName={pageName} groups={groups} config={config} items={items}></Quadrant>
        </div>
      </div>
    </Fadeable>
  );
}
