import * as React from "react";
import { GeometryBoard } from "../../src";

type PerpendicularBisectorExampleProps = {};

export const PerpendicularBisectorExample: React.FC<PerpendicularBisectorExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        const A = build("Point", { x: -3, y: 4, cfg: { label: "A" } });
        const B = build("Point", { x: 5, y: -2, cfg: { label: "B" } });
        build("Line", { start: A, end: B, cfg: { isSegment: true } });

        build("PerpendicularBisector", {
          start: A,
          end: B,
          cfg: { stroke: "red" },
        });
      }}
    </GeometryBoard>
  );
};
