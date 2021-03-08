import { __BOARD_SIZE, BoardConfig } from "../../src/GeometryBoard";
import { CoordinateTransformer } from "../../src/helper-types";

export const makeTransformers = ({
  xMin = -10,
  xMax = 10,
  yMin = -10,
  yMax = 10,
}: BoardConfig) => {
  const transformX: CoordinateTransformer = (xCartesian: number): number =>
    -__BOARD_SIZE + ((xCartesian - xMin) / (xMax - xMin)) * 2 * __BOARD_SIZE;
  const untransformX: CoordinateTransformer = (xSvg) =>
    ((xSvg + __BOARD_SIZE) / (2 * __BOARD_SIZE)) * (xMax - xMin) + xMin;

  const transformY: CoordinateTransformer = (yCartesian: number): number =>
    __BOARD_SIZE - ((yCartesian - yMin) / (yMax - yMin)) * 2 * __BOARD_SIZE;
  const untransformY: CoordinateTransformer = (ySvg) =>
    ((__BOARD_SIZE - ySvg) / (2 * __BOARD_SIZE)) * (yMax - yMin) + yMin;

  return { transformX, transformY, untransformX, untransformY };
};
