import * as React from "react";
import ReactDOM from "react-dom";
import { GeometryBoard } from "../src/GeometryBoard";

const HomePage: React.FC = () => {
  return (
    <div>
      <div style={{ width: 400, height: 400 }}>
        <GeometryBoard>
          {(builder) => {
            builder.axes();
            const A = builder.point(-3, 3);
            const B = builder.point(4, 4);
            const O = builder.point(0, 0);

            builder.line(A, B);
            builder.lineSegment(O, A);
            builder.lineSegment(O, B);
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
