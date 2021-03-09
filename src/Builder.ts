import { Point } from "./elements/Point";
import { BoardElement } from "./helper-types";
import { Axes } from "./elements/Axes";
import { LineSegment } from "./elements/LineSegment";
import { Line } from "./elements/Line";
import { Circle } from "./elements/Circle";
import { Polygon } from "./elements/Polygon";
import { Midpoint } from "./elements/Midpoint";
import { PerpendicularLine } from "./elements/PerpendicularLine";
import { ParallelLine } from "./elements/ParallelLine";
import { FunctionGraph } from "./elements/FunctionGraph";
import { Incenter } from "./elements/Incenter";
import { Incircle } from "./elements/Incircle";
import { Circumcenter } from "./elements/Circumcenter";
import { Circumcircle } from "./elements/Circumcircle";
import { LineIntersection } from "./elements/LineIntersection";

/**
 * Type of board elements
 */
export const boardElementTypes = {
  Axes,
  Point,
  LineSegment,
  Line,
  Circle,
  Polygon,
  Midpoint,
  PerpendicularLine,
  ParallelLine,
  FunctionGraph,
  Incenter,
  Incircle,
  Circumcenter,
  Circumcircle,
  LineIntersection,
} as const;
export type BoardElementConstructors = typeof boardElementTypes;

/**
 * Builder class
 */
export class Builder {
  elements: BoardElement[] = [];

  constructor() {}

  get sortedElements() {
    return [...this.elements].sort((a, b) => {
      if (a instanceof Point) {
        return 1;
      }
      if (b instanceof Point) {
        return -1;
      }
      return 0;
    });
  }

  build = <K extends keyof BoardElementConstructors>(
    name: K,
    arg: ConstructorParameters<BoardElementConstructors[K]>[0],
  ): InstanceType<BoardElementConstructors[K]> => {
    const TheClass = boardElementTypes[name];

    // @ts-ignore
    const el = new TheClass(arg);
    this.elements.push(el);

    // @ts-ignore
    return el;
  };
}

export type BuildFn = Builder["build"];
