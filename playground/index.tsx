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
          {(builder) => {
            builder.axes();
            const A = builder.point(-3, 3, { label: "A" });
            const B = builder.point(4, 4, { label: "B" });
            const O = builder.point(0, 0, { label: "O" });
            const H = builder.point(4, -4, { hidden: true });

            // builder.line(A, B);
            // builder.lineSegment(O, A);
            // builder.lineSegment(O, B);
            builder.polygon([A, B, O, H]);
            builder.circle(A, B);
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
