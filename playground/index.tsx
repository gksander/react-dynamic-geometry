import * as React from "react";
import ReactDOM from "react-dom";
import { BasicExample } from "./examples/BasicExample";
import { AxesExample } from "./examples/AxesExample";
import { PointExample } from "./examples/PointExample";
import { LineExample } from "./examples/LineExample";
import { CircleExample } from "./examples/CircleExample";
import { PolygonExample } from "./examples/PolygonExample";

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      {Examples.map((ex) => (
        <div
          style={{
            width: 400,
            height: 400,
            border: "1px solid black",
            borderRadius: 5,
            overflow: "hidden",
          }}
          key={ex.title}
        >
          <ex.Component />
        </div>
      ))}
    </div>
  );
};

const Examples: { title: string; Component: React.FC }[] = [
  {
    title: "Basic",
    Component: BasicExample,
  },
  {
    title: "Axes",
    Component: AxesExample,
  },
  {
    title: "Point",
    Component: PointExample,
  },
  {
    title: "Line",
    Component: LineExample,
  },
  {
    title: "Circle",
    Component: CircleExample,
  },
  {
    title: "Polygon",
    Component: PolygonExample,
  },
];

ReactDOM.render(
  <div>
    <HomePage />
  </div>,
  document.getElementById("root"),
);
