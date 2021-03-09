import { Circle, CircleConfiguration } from "./Circle";
import { Point } from "./Point";
import { Circumcenter } from "./Circumcenter";
import { atom } from "jotai";
import { getDistanceBetweenPoints } from "../utils/getDistanceBetweenPoints";
import { sqrt } from "../utils/mathFns";

export class Circumcircle extends Circle {
  constructor({
    points: [A, B, C],
    cfg = {},
  }: {
    points: [Point, Point, Point];
    cfg?: CircleConfiguration;
  }) {
    const center = new Circumcenter({ points: [A, B, C] });
    super({
      center,
      radius: atom(
        (get) => {
          const a = getDistanceBetweenPoints(get, B, C);
          const b = getDistanceBetweenPoints(get, A, C);
          const c = getDistanceBetweenPoints(get, A, B);
          const s = (a + b + c) / 2;

          return (
            (a * b * c) /
            (4 * sqrt(s * (a + b - s) * (a + c - s) * (b + c - s)))
          );
        },
        () => {},
      ),
    });
  }
}
