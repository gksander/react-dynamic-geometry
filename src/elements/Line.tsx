import * as React from "react";
import { Point } from "./Point";
import { useAtom } from "jotai";
import { useBoardContext } from "../GeometryBoard";
import { ArrowHeadMarkerDefs } from "./ArrowHeadMarkerDefs";
import { IPoint } from "../helper-types";

export class Line {
  start: Point;
  end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }
}

type LineDisplayProps = {
  line: Line;
};
export const LineDisplay: React.FC<LineDisplayProps> = ({ line }) => {
  const { xMin, xMax, yMin, yMax, transformX, transformY } = useBoardContext();
  const [xi] = useAtom(line.start.x);
  const [yi] = useAtom(line.start.y);
  const [xf] = useAtom(line.end.x);
  const [yf] = useAtom(line.end.y);
  const id = "foobar";

  const coords = React.useMemo<
    undefined | [number, number, number, number]
  >(() => {
    // Vertical line
    if (xi === xf) {
      if (xi < xMin || xi > xMax) {
        return undefined;
      } else {
        return [xi, yMin, xi, yMax];
      }
    }

    // Horizontal line
    if (yi === yf) {
      if (yi < yMin || yi > yMax) {
        return undefined;
      } else {
        return [xMin, yi, xMax, yi];
      }
    }

    const m = (yf - yi) / (xf - xi);

    const leftIntersection: IPoint | null = (() => {
      const hitPointX = xMin;
      const hitPointY = yi + m * (hitPointX - xi);

      if (hitPointY >= yMin && hitPointY <= yMax) {
        return { x: hitPointX, y: hitPointY };
      } else {
        return null;
      }
    })();

    const rightIntersection: IPoint | null = (() => {
      const hitPointX = xMax;
      const hitPointY = yi + m * (hitPointX - xi);

      if (hitPointY >= yMin && hitPointY <= yMax) {
        return { x: hitPointX, y: hitPointY };
      } else {
        return null;
      }
    })();

    const topIntersection: IPoint | null = (() => {
      const hitPointY = yMax;
      const hitPointX = (hitPointY - yi) / m + xi;

      if (hitPointX >= xMin && hitPointX <= xMax) {
        return { x: hitPointX, y: hitPointY };
      } else {
        return null;
      }
    })();

    const bottomIntersection: IPoint | null = (() => {
      const hitPointY = yMin;
      const hitPointX = (hitPointY - yi) / m + xi;

      if (hitPointX >= xMin && hitPointX <= xMax) {
        return { x: hitPointX, y: hitPointY };
      } else {
        return null;
      }
    })();

    const intersections = [
      leftIntersection,
      rightIntersection,
      topIntersection,
      bottomIntersection,
    ]
      .filter(Boolean)
      .sort((a, b) => Number(a?.x) - Number(b?.x));

    const [firstPoint, secondPoint] = intersections;

    if (firstPoint && secondPoint) {
      return [firstPoint.x, firstPoint.y, secondPoint.x, secondPoint.y];
    }

    return undefined;
  }, [xMin, xMin, yMin, yMax, xi, xf, yi, yf]);

  if (!coords) {
    return null;
  }

  const [x1, y1, x2, y2] = coords;

  return (
    <React.Fragment>
      <ArrowHeadMarkerDefs id={id} color="black" />
      <line
        x1={transformX(x1)}
        y1={transformY(y1)}
        x2={transformX(x2)}
        y2={transformY(y2)}
        strokeWidth={1}
        stroke="black"
        markerStart={`url(#arrowStart-${id})`}
        markerEnd={`url(#arrowEnd-${id})`}
      />
    </React.Fragment>
  );
};
