import * as React from "react";
import { GeometryBoard } from "../../src";

type LineIntersectionExampleProps = {};

export const LineIntersectionExample: React.FC<LineIntersectionExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        const A = build("Point", { x: -3, y: -3, cfg: { label: "A" } });
        const B = build("Point", { x: 4, y: 6, cfg: { label: "B" } });
        const L1 = build("Line", { start: A, end: B });

        const C = build("Point", { x: -3, y: 5, cfg: { label: "C" } });
        const D = build("Point", { x: 8, y: 3, cfg: { label: "D" } });
        const L2 = build("Line", { start: C, end: D });

        build("LineIntersection", {
          line1: L1,
          line2: L2,
          cfg: { label: "I", color: "red" },
        });
      }}
    </GeometryBoard>
  );
};
