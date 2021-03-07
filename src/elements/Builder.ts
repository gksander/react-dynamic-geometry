import { Point } from "./Point";
import { BoardElement } from "../helper-types";
import { Axes } from "./Axes";
import { LineSegment } from "./LineSegment";
import { Line } from "./Line";
import { Circle } from "./Circle";
import { Polygon } from "./Polygon";

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
