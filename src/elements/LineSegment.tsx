import * as React from "react";
import { Point } from "./Point";
import { useBoardContext } from "../GeometryBoard";
import { useAtom } from "jotai";
import { BoardElement } from "../helper-types";

/**
 * Line segment class
 */
export class LineSegment implements BoardElement {
  start: Point;
  end: Point;
  cfg: LineSegmentConfiguration;

  constructor(start: Point, end: Point, cfg: LineSegmentConfiguration = {}) {
    this.start = start;
    this.end = end;
    this.cfg = cfg;
  }

  Render = () => <LineSegmentDisplay lineSegment={this} />;
}

export type LineSegmentConfiguration = Partial<React.SVGProps<SVGLineElement>>;

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
      strokeWidth={1}
      stroke="black"
      {...lineSegment.cfg}
      x1={transformX(xi)}
      y1={transformY(yi)}
      x2={transformX(xf)}
      y2={transformY(yf)}
    />
  );
};
