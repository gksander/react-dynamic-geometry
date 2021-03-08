import * as React from "react";
import { GeometryBoard } from "../../src";

type IncircleExampleProps = {};

export const IncircleExample: React.FC<IncircleExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        const A = build("Point", { x: -5, y: -3 });
        const B = build("Point", { x: 6, y: -3 });
        const C = build("Point", { x: -4, y: 5 });
        build("Polygon", { vertices: [A, B, C] });

        build("Incircle", {
          points: [A, B, C],
          cfg: { fill: "blue", fillOpacity: 0.2 },
        });
      }}
    </GeometryBoard>
  );
};
