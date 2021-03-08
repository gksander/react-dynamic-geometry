import * as React from "react";
import { GeometryBoard } from "../../src";

type IncenterExampleProps = {};

export const IncenterExample: React.FC<IncenterExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        const A = build("Point", { x: -5, y: -3 });
        const B = build("Point", { x: 6, y: -3 });
        const C = build("Point", { x: -4, y: 5 });
        build("Polygon", { vertices: [A, B, C] });

        build("Incenter", { points: [A, B, C], cfg: { label: "Incenter" } });
      }}
    </GeometryBoard>
  );
};
