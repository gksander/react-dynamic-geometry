import * as React from "react";
import { GeometryBoard } from "../../src";

type ParallelLineExampleProps = {};

export const ParallelLineExample: React.FC<ParallelLineExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        const A = build("Point", { x: -3, y: 4 });
        const B = build("Point", { x: 5, y: -2 });
        const C = build("Point", { x: 4, y: 5 });
        const L = build("Line", { start: A, end: B, cfg: { stroke: "blue" } });

        build("ParallelLine", {
          parallelTo: L,
          passesThrough: C,
          cfg: { stroke: "red" },
        });
      }}
    </GeometryBoard>
  );
};
