import { Line, LineConfiguration } from "./Line";
import { Point } from "./Point";
import { atom } from "jotai";

export class ParallelLine extends Line {
  parallelTo: Line;
  passesThrough: Point;

  constructor({
    parallelTo,
    passesThrough,
    cfg = {},
  }: {
    parallelTo: Line;
    passesThrough: Point;
    cfg?: LineConfiguration;
  }) {
    super({
      start: passesThrough,
      slope: atom(
        (get) => {
          const dy = get(this.parallelTo.end.y) - get(this.parallelTo.start.y);
          const dx = get(this.parallelTo.end.x) - get(this.parallelTo.start.x);
          return dy / dx;
        },
        () => {},
      ),
      cfg,
    });
    this.parallelTo = parallelTo;
    this.passesThrough = passesThrough;
  }
}
