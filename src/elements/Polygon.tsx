import * as React from "react";
import { Point } from "./Point";
import { atom, Atom, useAtom } from "jotai";
import { IPoint } from "../helper-types";
import { square } from "../utils/mathFns";
import { useBoardContext } from "../GeometryBoard";

export class Polygon {
  __vertices: Point[];
  vertices: Atom<IPoint[]>;

  constructor(vertices: Point[]) {
    this.__vertices = vertices;
    this.vertices = atom((get) =>
      this.__vertices.map((v) => ({ x: get(v.x), y: get(v.y) })),
    );
  }
}

type PolygonDisplayProps = {
  polygon: Polygon;
};

export const PolygonDisplay: React.FC<PolygonDisplayProps> = ({ polygon }) => {
  const { transformX, transformY } = useBoardContext();
  const [vertices] = useAtom(polygon.vertices);

  const d = React.useMemo(() => {
    const [first, ...rest] = polySort(vertices);
    return [
      `M ${transformX(first.x)} ${transformY(first.y)}`,
      ...rest.map((v) => `L ${transformX(v.x)}, ${transformY(v.y)}`),
      `L ${transformX(first.x)}, ${transformY(first.y)}`,
    ].join(" ");
  }, [vertices, transformX, transformY]);

  return <path d={d} strokeWidth={1} stroke="black" fill="transparent" />;
};

/**
 * Sort points into order they should be mapped
 */
const polySort = (points: IPoint[]): IPoint[] => {
  const center: IPoint = {
    x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
    y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
  };

  return points
    .map((point) => ({
      point,
      polarDelta: squaredPolar(point, center),
    }))
    .sort(
      (a, b) =>
        a.polarDelta.theta - b.polarDelta.theta ||
        a.polarDelta.r2 - b.polarDelta.r2,
    )
    .map(({ point }) => point);
};

/**
 * Get polar coords relative to center of polygon (radius squared)
 */
const squaredPolar = (
  point: IPoint,
  center: IPoint,
): { theta: number; r2: number } => {
  return {
    theta: Math.atan2(point.y - center.y, point.x - center.x),
    r2: square(point.x - center.x) + square(point.y - center.y),
  };
};
