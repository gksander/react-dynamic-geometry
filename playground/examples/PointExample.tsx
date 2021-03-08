import * as React from "react";
import { GeometryBoard } from "../../src";

type PointExampleProps = {};

export const PointExample: React.FC<PointExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        build("Axes", {});

        const A = build("Point", { x: 3, y: 4 });
        build("Point", {
          x: -4,
          y: A.y,
          cfg: { label: "B", color: "red" },
        });
      }}
    </GeometryBoard>
  );
};
