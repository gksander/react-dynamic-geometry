import * as React from "react";
import { Point, PointConfiguration } from "./Point";
import { RawPointDisplay } from "../components/RawPointDisplay";
import { Getter } from "jotai/core/types";
import { getAngleBetweenThreePoints } from "../utils/getAngleBetweenThreePoints";
import { atom } from "jotai";
import { getDistanceBetweenPoints } from "../utils/getDistanceBetweenPoints";

export class Circumcenter extends Point {
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
          const { Ax, Ay, Bx, By, Cx, Cy, mA, mB, mC } = getValues(
            get,
            A,
            B,
            C,
          );
          const x =
            (Ax * Math.sin(2 * mA) +
              Bx * Math.sin(2 * mB) +
              Cx * Math.sin(2 * mC)) /
            (Math.sin(2 * mA) + Math.sin(2 * mB) + Math.sin(2 * mC));

          // console.log("x", x);
          return x;
        },
        () => {},
      ),
      y: atom(
        (get) => {
          const { Ax, Ay, Bx, By, Cx, Cy, mA, mB, mC } = getValues(
            get,
            A,
            B,
            C,
          );
          const y =
            (Ay * Math.sin(2 * mA) +
              By * Math.sin(2 * mB) +
              Cy * Math.sin(2 * mC)) /
            (Math.sin(2 * mA) + Math.sin(2 * mB) + Math.sin(2 * mC));
          // console.log("y", y);
          return y;
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

  const mA = getAngleBetweenThreePoints(get, { center: A, start: B, end: C });
  const mB = getAngleBetweenThreePoints(get, { center: B, start: A, end: C });
  const mC = getAngleBetweenThreePoints(get, { center: C, start: A, end: B });

  console.log("A", mA, "B", mB, "C", mC);

  return { Ax, Ay, Bx, By, Cx, Cy, mA, mB, mC };
};
