import * as React from "react";
import { GeometryBoard } from "../../src";

type LineSegmentExampleProps = {};

export const LineSegmentExample: React.FC<LineSegmentExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        const A = build("Point", { x: -5, y: 5 });
        const B = build("Point", { x: 3, y: -4 });

        build("LineSegment", { start: A, end: B, cfg: { stroke: "red" } });
      }}
    </GeometryBoard>
  );
};
