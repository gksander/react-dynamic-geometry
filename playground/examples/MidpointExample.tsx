import * as React from "react";
import { GeometryBoard } from "../../src";

type MidpointExampleProps = {};

export const MidpointExample: React.FC<MidpointExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        build("Axes", {});
        const A = build("Point", { x: -2, y: -3, cfg: { label: "A" } });
        const B = build("Point", { x: 5, y: 7, cfg: { label: "B" } });

        build("Line", { start: A, end: B, cfg: { isSegment: true } });
        build("Midpoint", { start: A, end: B, cfg: { label: "Midpoint" } });
      }}
    </GeometryBoard>
  );
};
