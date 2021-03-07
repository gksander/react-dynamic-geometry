import { Circle, CircleConfiguration } from "./Circle";
import { Point } from "./Point";
import { Incenter } from "./Incenter";
import { distanceBetweenPoints } from "../utils/distanceBetweenPoints";
import { atom } from "jotai";
import { sqrt } from "../utils/mathFns";

export class Incircle extends Circle {
  constructor({
    points: [A, B, C],
    cfg = {},
  }: {
    points: [Point, Point, Point];
    cfg?: CircleConfiguration;
  }) {
    const center = new Incenter({ points: [A, B, C] });

    super({
      center,
      radius: atom(
        (get) => {
          const Ax = get(A.x);
          const Ay = get(A.y);
          const Bx = get(B.x);
          const By = get(B.y);
          const Cx = get(C.x);
          const Cy = get(C.y);

          const a = distanceBetweenPoints({ x: Bx, y: By }, { x: Cx, y: Cy });
          const b = distanceBetweenPoints({ x: Ax, y: Ay }, { x: Cx, y: Cy });
          const c = distanceBetweenPoints({ x: Ax, y: Ay }, { x: Bx, y: By });

          const s = (a + b + c) / 2;

          return sqrt(((s - a) * (s - b) * (s - c)) / s);
        },
        () => {},
      ),
      cfg,
    });
  }
}
