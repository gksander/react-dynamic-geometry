import * as React from "react";
import { BoardElement } from "../helper-types";
import { Point, PointConfiguration } from "./Point";
import { useAtom } from "jotai";
import { RawPointDisplay } from "../components/RawPointDisplay";

export class Midpoint implements BoardElement {
  start: Point;
  end: Point;
  cfg: MidpointConfiguration;

  constructor({
    start,
    end,
    cfg = {},
  }: {
    start: Point;
    end: Point;
    cfg?: PointConfiguration;
  }) {
    this.start = start;
    this.end = end;
    this.cfg = cfg;
  }

  Render = () => <MidpointDisplay midpoint={this} />;
}

type MidpointConfiguration = {};

/**
 * Display
 */
type MidpointDisplayProps = { midpoint: Midpoint };
export const MidpointDisplay: React.FC<MidpointDisplayProps> = ({
  midpoint,
}) => {
  const [x1] = useAtom(midpoint.start.x);
  const [y1] = useAtom(midpoint.start.y);
  const [x2] = useAtom(midpoint.end.x);
  const [y2] = useAtom(midpoint.end.y);

  const x = (x1 + x2) / 2;
  const y = (y1 + y2) / 2;

  return <RawPointDisplay {...{ x, y, cfg: midpoint.cfg }} />;
};
