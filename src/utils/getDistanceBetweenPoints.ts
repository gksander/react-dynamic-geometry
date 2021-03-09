import { Getter } from "jotai/core/types";
import { Point } from "../elements/Point";
import { sqrt, square } from "./mathFns";

export const getDistanceBetweenPoints = (
  get: Getter,
  A: Point,
  B: Point,
): number => {
  const x1 = get(A.x);
  const y1 = get(A.y);
  const x2 = get(B.x);
  const y2 = get(B.y);

  return sqrt(square(x2 - x1) + square(y2 - y1));
};
