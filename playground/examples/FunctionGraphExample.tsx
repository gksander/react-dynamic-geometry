import * as React from "react";
import { GeometryBoard } from "../../src";

type FunctionGraphExampleProps = {};

export const FunctionGraphExample: React.FC<FunctionGraphExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        build("Axes", {});

        build("FunctionGraph", {
          fn: (x) => 3 * Math.sin(x),
          a: -2 * Math.PI,
          b: 2 * Math.PI,
          cfg: { stroke: "blue" },
        });

        build("FunctionGraph", {
          fn: (x) => (x <= 0 ? x : 0.3 * x * x),
          cfg: { stroke: "red" },
        });
      }}
    </GeometryBoard>
  );
};
