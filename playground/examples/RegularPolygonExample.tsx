import * as React from "react";
import { GeometryBoard } from "../../src";

type RegularPolygonExampleProps = {};

export const RegularPolygonExample: React.FC<RegularPolygonExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        const A = build("Point", { x: -2, y: -5, cfg: { label: "A" } });
        const B = build("Point", { x: 3, y: -2, cfg: { label: "B" } });
        build("RegularPolygon", { points: [A, B], numSides: 5 });
      }}
    </GeometryBoard>
  );
};
