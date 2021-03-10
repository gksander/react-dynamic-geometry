import { Polygon, PolygonConfiguration } from "./Polygon";
import { Point } from "./Point";
import { atom } from "jotai";
import { getDistanceBetweenPoints } from "../utils/getDistanceBetweenPoints";
import { getAngleBetweenTwoPoints } from "../utils/getAngleBetweenTwoPoints";

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
      /**
       * We build the vertices by stepping through, one point at a time.
       *  - Use previous two points to determine angle between current point, and next point
       *  - Use distance between A and B to determine distance between current and next point
       */
      vertices: (() => {
        const vertices: Point[] = [];
        vertices.push(B, A);

        for (let i = 0; i < numSides - 2; i++) {
          const LastPoint = vertices[vertices.length - 2];
          const CurrentPoint = vertices[vertices.length - 1];

          const NewPoint = new Point({
            x: atom(
              (get) => {
                const d = getDistanceBetweenPoints(get, A, B);
                const theta =
                  getAngleBetweenTwoPoints(get, LastPoint, CurrentPoint) -
                  (2 * Math.PI) / numSides;

                return get(CurrentPoint.x) + d * Math.cos(theta);
              },
              () => {},
            ),
            y: atom(
              (get) => {
                const d = getDistanceBetweenPoints(get, A, B);
                const theta =
                  getAngleBetweenTwoPoints(get, LastPoint, CurrentPoint) -
                  (2 * Math.PI) / numSides;

                return get(CurrentPoint.y) + d * Math.sin(theta);
              },
              () => {},
            ),
          });

          vertices.push(NewPoint);
        }

        return vertices;
      })(),
      cfg,
    });
  }
}
