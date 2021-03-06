import * as React from "react";
import ReactDOM from "react-dom";
import { BasicExample } from "./examples/BasicExample";
import { AxesExample } from "./examples/AxesExample";
import { PointExample } from "./examples/PointExample";
import { LineExample } from "./examples/LineExample";
import { CircleExample } from "./examples/CircleExample";
import { PolygonExample } from "./examples/PolygonExample";
import { FunctionGraphExample } from "./examples/FunctionGraphExample";
import { ParallelLineExample } from "./examples/ParallelLineExample";
import { PerpendicularLine } from "../src/elements/PerpendicularLine";
import { PerpendicularLineExample } from "./examples/PerpendicularLineExample";
import { MidpointExample } from "./examples/MidpointExample";
import { IncenterExample } from "./examples/IncenterExample";
import { IncircleExample } from "./examples/IncircleExample";
import { LineIntersectionExample } from "./examples/LineIntersectionExample";
import { PerpendicularBisectorExample } from "./examples/PerpendicularBisectorExample";
import { RegularPolygonExample } from "./examples/RegularPolygonExample";

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
  {
    title: "RegularPolygon",
    Component: RegularPolygonExample,
  },
  {
    title: "FunctionGraph",
    Component: FunctionGraphExample,
  },
  {
    title: "ParallelLine",
    Component: ParallelLineExample,
  },
  {
    title: "PerpendicularLine",
    Component: PerpendicularLineExample,
  },
  {
    title: "MidpointExample",
    Component: MidpointExample,
  },
  {
    title: "Incenter",
    Component: IncenterExample,
  },
  {
    title: "Incircle",
    Component: IncircleExample,
  },
  {
    title: "LineIntersection",
    Component: LineIntersectionExample,
  },
  {
    title: "PerpendicularBisector",
    Component: PerpendicularBisectorExample,
  },
];

ReactDOM.render(
  <div>
    <HomePage />
  </div>,
  document.getElementById("root"),
);
