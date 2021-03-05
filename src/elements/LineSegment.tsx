import * as React from "react";
import { Point } from "./Point";
import { useBoardContext } from "../useBoard";
import { useAtom } from "jotai";

/**
 * Line segment class
 */
export class LineSegment {
  start: Point;
  end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }
}

/**
 * Display
 */
type LineSegmentDisplayProps = {
  lineSegment: LineSegment;
};
export const LineSegmentDisplay: React.FC<LineSegmentDisplayProps> = ({
  lineSegment,
}) => {
  const { transformX, transformY } = useBoardContext();
  const [xi] = useAtom(lineSegment.start.x);
  const [yi] = useAtom(lineSegment.start.y);
  const [xf] = useAtom(lineSegment.end.x);
  const [yf] = useAtom(lineSegment.end.y);

  return (
    <line
      x1={transformX(xi)}
      y1={transformY(yi)}
      x2={transformX(xf)}
      y2={transformY(yf)}
      strokeWidth={1}
      stroke="blue"
    />
  );
};
