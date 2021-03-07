import * as React from "react";
import ReactDOM from "react-dom";
import { GeometryBoard } from "../src";

const HomePage: React.FC = () => {
  return (
    <div>
      <div
        style={{
          width: 400,
          height: 400,
          border: "1px solid black",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <GeometryBoard>
          {(build) => {
            const A = build("Point", { x: 2, y: 2, cfg: { label: "A" } });
            const B = build("Point", { x: 0, y: 3 });
            const O = build("Point", { x: -5, y: 5 });
            const L = build("Line", { start: A, end: B });
            build("Circle", { center: B, radius: A.x });
            build("Polygon", {
              vertices: [A, B, O],
              cfg: { fill: "red", fillOpacity: 0.5 },
            });
          }}
        </GeometryBoard>
      </div>
    </div>
  );
};

ReactDOM.render(
  <div>
    <HomePage />
  </div>,
  document.getElementById("root"),
);
