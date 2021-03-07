import * as React from "react";
import { useBoardContext } from "../GeometryBoard";
import { ArrowHeadMarkerDefs } from "./ArrowHeadMarkerDefs";
import { BoardElement } from "../helper-types";

export class Axes implements BoardElement {
  Render = AxesDisplay;
}

type AxesDisplayProps = {};
const AxesDisplay: React.FC<AxesDisplayProps> = () => {
  const { xMin, xMax, yMin, yMax, transformX, transformY } = useBoardContext();
  const stroke = "gray"; // TODO: Should be configurable
  const id = "axes"; // TODO: Should not be hardcoded?

  return (
    <React.Fragment>
      <ArrowHeadMarkerDefs id={id} color={stroke} />
      <line
        x1={transformX(xMin)}
        y1={transformY(0)}
        x2={transformX(xMax)}
        y2={transformY(0)}
        strokeWidth={0.4}
        stroke={stroke}
        markerStart={`url(#arrowStart-${id})`}
        markerEnd={`url(#arrowEnd-${id})`}
      />
      <line
        x1={transformX(0)}
        y1={transformY(yMin)}
        x2={transformX(0)}
        y2={transformY(yMax)}
        strokeWidth={0.4}
        stroke={stroke}
        markerStart={`url(#arrowStart-${id})`}
        markerEnd={`url(#arrowEnd-${id})`}
      />
    </React.Fragment>
  );
};

export const axes = (...args: ConstructorParameters<typeof Axes>) =>
  new Axes(...args);
