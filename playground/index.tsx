import * as React from "react";
import ReactDOM from "react-dom";
import { useBoard } from "../src";

const HomePage: React.FC = () => {
  const Board = useBoard(
    React.useCallback((builder) => {
      builder.axes();
      const A = builder.point(-3, 3);
      const B = builder.point(4, 4);
      const O = builder.point(0, 0);

      builder.line(A, B);
      builder.lineSegment(O, A);
      builder.lineSegment(O, B);
      builder.circle(A, B);
    }, []),
    {},
  );

  return (
    <div>
      <div style={{ width: 400, height: 400 }}>{Board}</div>
    </div>
  );
};

ReactDOM.render(
  <div>
    <HomePage />
  </div>,
  document.getElementById("root"),
);
