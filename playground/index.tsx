import * as React from "react";
import ReactDOM from "react-dom";
import { BasicExample } from "./examples/BasicExample";
import { MidpointExample } from "./examples/MidpointExample";

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
        <BasicExample />
      </div>
      <div
        style={{
          width: 400,
          height: 400,
          border: "1px solid black",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <MidpointExample />
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
