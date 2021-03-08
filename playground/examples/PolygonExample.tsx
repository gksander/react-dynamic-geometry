import * as React from "react";
import { GeometryBoard } from "../../src";

type PolygonExampleProps = {};

export const PolygonExample: React.FC<PolygonExampleProps> = () => {
  return (
    <GeometryBoard>
      {(build) => {
        const getRandomCoord = () => -9 + Math.round(18 * Math.random());
        const vertices = [1, 2, 3, 4, 5].map(() =>
          build("Point", { x: getRandomCoord(), y: getRandomCoord() }),
        );

        build("Polygon", {
          vertices,
          cfg: { fill: "green", fillOpacity: 0.2 },
        });
      }}
    </GeometryBoard>
  );
};
