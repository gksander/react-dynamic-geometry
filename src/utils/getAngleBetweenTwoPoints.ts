import { Point } from "../elements/Point";
import { Getter } from "jotai/core/types";

export const getAngleBetweenTwoPoints = (get: Getter, A: Point, B: Point) => {
  const Ax = get(A.x);
  const Ay = get(A.y);
  const Bx = get(B.x);
  const By = get(B.y);

  return Math.atan2(By - Ay, Bx - Ax);
};
