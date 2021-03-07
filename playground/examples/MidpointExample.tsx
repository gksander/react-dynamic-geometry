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
        const O = build("Point", { x: 3, y: -3 });

        const L = build("Line", { start: A, end: B });
        build("Midpoint", { start: A, end: B, cfg: { label: "Midpoint" } });

        build("PerpendicularLine", {
          perpendicularTo: L,
          passesThrough: O,
        });
      }}
    </GeometryBoard>
  );
};
