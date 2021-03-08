import * as React from "react";
import { GeometryBoard } from "../../src";

type AxesExampleProps = {};

export const AxesExample: React.FC<AxesExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        build("Axes", {});
      }}
    </GeometryBoard>
  );
};
