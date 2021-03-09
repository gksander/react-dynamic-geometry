import * as React from "react";
import { GeometryBoard } from "../../src";

type LineExampleProps = {};

export const LineExample: React.FC<LineExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        const A = build("Point", { x: -5, y: 5 });
        const B = build("Point", { x: 3, y: -4 });
        const C = build("Point", { x: -3, y: -5 });

        build("Line", { start: A, end: B, cfg: { stroke: "purple" } });
        build("Line", { start: A, end: C, cfg: { isSegment: true } });
      }}
    </GeometryBoard>
  );
};
