import * as React from "react";
import { Point, PointConfiguration } from "./Point";
import { atom } from "jotai";
import { distanceBetweenPoints } from "../utils/distanceBetweenPoints";
import { Getter } from "jotai/core/types";
import { RawPointDisplay } from "../components/RawPointDisplay";

export class Incenter extends Point {
  constructor({
    points: [A, B, C],
    cfg = {},
  }: {
    points: [Point, Point, Point];
    cfg?: PointConfiguration;
  }) {
    super({
      x: atom(
        (get) => {
          const { Ax, Bx, Cx, a, b, c } = getValues(get, A, B, C);
          return (a * Ax + b * Bx + c * Cx) / (a + b + c);
        },
        () => {},
      ),
      y: atom(
        (get) => {
          const { Ay, By, Cy, a, b, c } = getValues(get, A, B, C);
          return (a * Ay + b * By + c * Cy) / (a + b + c);
        },
        () => {},
      ),
      cfg,
    });
  }

  Render = () => <RawPointDisplay point={this} />;
}

const getValues = (get: Getter, A: Point, B: Point, C: Point) => {
  const Ax = get(A.x);
  const Ay = get(A.y);
  const Bx = get(B.x);
  const By = get(B.y);
  const Cx = get(C.x);
  const Cy = get(C.y);

  const a = distanceBetweenPoints({ x: Bx, y: By }, { x: Cx, y: Cy });
  const b = distanceBetweenPoints({ x: Ax, y: Ay }, { x: Cx, y: Cy });
  const c = distanceBetweenPoints({ x: Ax, y: Ay }, { x: Bx, y: By });

  return { Ax, Ay, Bx, By, Cx, Cy, a, b, c };
};
