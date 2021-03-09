import { Polygon, PolygonConfiguration } from "./Polygon";
import { Point } from "./Point";

export class RegularPolygon extends Polygon {
  constructor({
    points: [A, B],
    numSides,
    cfg = {},
  }: {
    points: [Point, Point];
    numSides: number;
    cfg?: PolygonConfiguration;
  }) {
    super({
      vertices: Array.from({ length: numSides })
        .map((_, i) => i)
        .map((i) => {
          return new Point({ x: 2 * i, y: 2 * i });
        }),
      cfg,
    });
  }
}
