import * as React from "react";
import { Line, LineConfiguration } from "./Line";
import { Point } from "./Point";
import { atom } from "jotai";

export class PerpendicularLine extends Line {
  perpendicularTo: Line;
  passesThrough: Point;

  constructor({
    perpendicularTo,
    passesThrough,
    cfg = {},
  }: {
    perpendicularTo: Line;
    passesThrough: Point;
    cfg?: LineConfiguration;
  }) {
    super({
      start: passesThrough,
      slope: atom(
        (get) => {
          return (
            (get(this.perpendicularTo.start.x) -
              get(this.perpendicularTo.end.x)) /
            (get(this.perpendicularTo.end.y) -
              get(this.perpendicularTo.start.y))
          );
        },
        () => {},
      ),
      cfg,
    });

    this.perpendicularTo = perpendicularTo;
    this.passesThrough = passesThrough;
  }
}
