import * as React from "react";
import { Point } from "./Point";
import { atom, useAtom } from "jotai";
import { useBoardContext } from "../GeometryBoard";
import { ArrowHeadMarkerDefs } from "./ArrowHeadMarkerDefs";
import { BoardElement, IPoint, NumberAtom } from "../helper-types";

export class Line implements BoardElement {
  start: Point;
  end: Point;
  cfg: LineConfiguration;

  constructor({
    start,
    end,
    slope,
    cfg = {},
  }: {
    start: Point;
    end?: Point;
    slope?: number | NumberAtom;
    cfg?: LineConfiguration;
  }) {
    this.start = start;

    if (end) {
      this.end = end;
    } else if (slope) {
      this.end = new Point({
        x: atom(
          (get) => get(start.x) + 1,
          () => {},
        ),
        y: atom(
          (get) =>
            get(start.y) + (typeof slope === "number" ? slope : get(slope)),
          () => {},
        ),
      });
    } else {
      this.end = new Point({
        x: atom(
          (get) => get(start.x) + 1,
          () => {},
        ),
        y: start.y,
      });
    }

    this.cfg = cfg;
  }

  Render = ({ index }: { index: number }) => (
    <LineDisplay line={this} index={index} />
  );
}

export type LineConfiguration = Partial<React.SVGProps<SVGLineElement>>;

type LineDisplayProps = {
  line: Line;
  index?: number;
};
export const LineDisplay: React.FC<LineDisplayProps> = ({
  line,
  index = 1,
}) => {
  const { xMin, xMax, yMin, yMax, transformX, transformY } = useBoardContext();
  const [xi] = useAtom(line.start.x);
  const [yi] = useAtom(line.start.y);
  const [xf] = useAtom(line.end.x);
  const [yf] = useAtom(line.end.y);
  const lineColor = line.cfg?.stroke || "black";
  const id = `line-${lineColor}`;

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
      <ArrowHeadMarkerDefs id={id} color={lineColor} />
      <line
        strokeWidth={1}
        stroke={lineColor}
        {...line.cfg}
        x1={transformX(x1)}
        y1={transformY(y1)}
        x2={transformX(x2)}
        y2={transformY(y2)}
        markerStart={`url(#arrowStart-${id})`}
        markerEnd={`url(#arrowEnd-${id})`}
      />
    </React.Fragment>
  );
};
