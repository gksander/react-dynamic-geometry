import * as React from "react";
import { GeometryBoard } from "../../src";

type BasicExampleProps = {};

export const BasicExample: React.FC<BasicExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        build("Axes", {});

        const A = build("Point", { x: 2, y: 2, cfg: { label: "A" } });
        const B = build("Point", { x: -3, y: 3 });
        const O = build("Point", { x: -5, y: 8 });
        build("Incenter", { points: [A, B, O], cfg: { label: "Incenter" } });

        build("Line", { start: A, end: B });
        build("Circle", { center: B, radius: A.x });
        build("Polygon", {
          vertices: [A, B, O],
          cfg: { fill: "red", fillOpacity: 0.5 },
        });
      }}
    </GeometryBoard>
  );
};
