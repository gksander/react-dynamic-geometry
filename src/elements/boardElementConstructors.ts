import { point } from "./Point";
import { axes } from "./Axes";
import { lineSegment } from "./LineSegment";
import { line } from "./Line";
import { circle } from "./Circle";
import { polygon } from "./Polygon";

export const boardElementConstructors = {
  axes,
  point,
  lineSegment,
  line,
  circle,
  polygon,
} as const;

export type BoardElementConstructors = typeof boardElementConstructors;
export type MutableBoardElementConstructors = {
  -readonly [Property in keyof BoardElementConstructors]: BoardElementConstructors[Property];
};
