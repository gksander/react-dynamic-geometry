import { sqrt, square } from "./mathFns";
import { IPoint } from "../helper-types";

export const distanceBetweenPoints = (point1: IPoint, point2: IPoint) =>
  sqrt(square(point2.x - point1.x) + square(point2.y - point1.y));
