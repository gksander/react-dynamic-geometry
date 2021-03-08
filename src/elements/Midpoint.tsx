import * as React from "react";
import { Point, PointConfiguration } from "./Point";
import { atom, useAtom } from "jotai";
import { RawPointDisplay } from "../components/RawPointDisplay";

export class Midpoint extends Point {
  start: Point;
  end: Point;

  constructor({
    start,
    end,
    cfg = {},
  }: {
    start: Point;
    end: Point;
    cfg?: PointConfiguration;
  }) {
    super({
      x: atom(
        (get) => (get(this.start.x) + get(this.end.x)) / 2,
        () => {},
      ),
      y: atom(
        (get) => (get(this.start.y) + get(this.end.y)) / 2,
        () => {},
      ),
      cfg,
    });

    this.start = start;
    this.end = end;
  }

  Render = () => <RawPointDisplay point={this} />;
}
