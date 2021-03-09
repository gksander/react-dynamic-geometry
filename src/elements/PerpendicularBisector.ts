import { Line, LineConfiguration } from "./Line";
import { PerpendicularLine } from "./PerpendicularLine";
import { Point } from "./Point";
import { Midpoint } from "./Midpoint";

export class PerpendicularBisector extends PerpendicularLine {
  constructor({
    start,
    end,
    cfg = {},
  }: {
    start: Point;
    end: Point;
    cfg?: LineConfiguration;
  }) {
    super({
      perpendicularTo: new Line({ start, end }),
      passesThrough: new Midpoint({ start, end }),
      cfg,
    });
  }
}
