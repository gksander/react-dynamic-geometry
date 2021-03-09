import * as React from "react";
import { GeometryBoard } from "../../src";

type RegularPolygonExampleProps = {};

export const RegularPolygonExample: React.FC<RegularPolygonExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        const A = build("Point", { x: 0, y: 0 });
        const B = build("Point", { x: 3, y: 0 });
        build("RegularPolygon", { points: [A, B], numSides: 5 });
      }}
    </GeometryBoard>
  );
};
