import * as React from "react";
import { GeometryBoard } from "../../src";

type CircleExampleProps = {};

export const CircleExample: React.FC<CircleExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        const A = build("Point", { x: 1, y: 1 });
        build("Circle", {
          center: A,
          radius: 3,
          cfg: { fill: "blue", fillOpacity: 0.2 },
        });

        const B = build("Point", { x: 4, y: 5 });
        build("Circle", {
          center: B,
          radius: A,
          cfg: { stroke: "purple" },
        });
      }}
    </GeometryBoard>
  );
};
