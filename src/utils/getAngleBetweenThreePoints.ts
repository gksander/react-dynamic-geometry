import { Getter } from "jotai/core/types";
import { Point } from "../elements/Point";

/**
 * Get angle between three points, m<BAC. First point is the vertex.
 */
export const getAngleBetweenThreePoints = (
  get: Getter,
  { center, start, end }: { center: Point; start: Point; end: Point },
): number => {
  const Ax = get(center.x);
  const Ay = get(center.y);
  const Bx = get(end.x);
  const By = get(end.y);
  const Cx = get(start.x);
  const Cy = get(start.y);

  const ang1 = Math.atan2(By - Ay, Bx - Ax);
  const ang2 = Math.atan2(Cy - Ay, Cx - Ax);

  return Math.abs(ang1 - ang2);
};
