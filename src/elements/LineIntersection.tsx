import * as React from "react";
import { Point, PointConfiguration } from "./Point";
import { Line } from "./Line";
import { atom } from "jotai";
import { Getter } from "jotai/core/types";
import { RawPointDisplay } from "../components/RawPointDisplay";

export class LineIntersection extends Point {
  constructor({
    line1,
    line2,
    cfg = {},
  }: {
    line1: Line;
    line2: Line;
    cfg?: PointConfiguration;
  }) {
    super({
      x: atom(
        (get) => {
          return getX(get, line1, line2);
        },
        () => {},
      ),
      y: atom(
        (get) => {
          const x = getX(get, line1, line2);
          const m1 = get(line1.slope);
          const x1 = get(line1.start.x);
          const y1 = get(line1.start.y);

          return m1 * (x - x1) + y1;
        },
        () => {},
      ),
      cfg,
    });
  }

  Render = () => <RawPointDisplay point={this} />;
}

const getX = (get: Getter, line1: Line, line2: Line) => {
  const m1 = get(line1.slope);
  const x1 = get(line1.start.x);
  const y1 = get(line1.start.y);
  const m2 = get(line2.slope);
  const x2 = get(line2.start.x);
  const y2 = get(line2.start.y);

  return (m1 * x1 - m2 * x2 + y2 - y1) / (m1 - m2);
};
