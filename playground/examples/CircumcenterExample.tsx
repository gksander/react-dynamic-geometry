import * as React from "react";
import { GeometryBoard } from "../../src";

type CircumcenterExample = {};

export const CircurmcenterExample: React.FC<CircumcenterExample> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        const A = build("Point", { x: 0, y: 0 });
        const B = build("Point", { x: 8, y: 0 });
        const C = build("Point", { x: 0, y: 6 });
        build("Polygon", { vertices: [A, B, C] });

        build("Circumcenter", { points: [A, B, C], cfg: { label: "Center" } });
        build("Circumcircle", { points: [A, B, C] });
      }}
    </GeometryBoard>
  );
};
