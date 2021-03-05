import * as React from "react";
import { Point } from "./Point";
import { useBoardContext } from "../useBoard";
import { atom, useAtom } from "jotai";
import { distanceBetweenPoints } from "../utils/distanceBetweenPoints";
import { NumberAtom } from "../helper-types";
import { abs } from "../utils/mathFns";

export class Circle {
  center: Point;
  radius: NumberAtom;

  constructor(center: Point, radius: CircleRadius) {
    this.center = center;

    this.radius = (() => {
      if (typeof radius === "number") {
        return atom(radius);
      } else if (radius instanceof Point) {
        return atom(
          (get) =>
            distanceBetweenPoints(
              { x: get(center.x), y: get(center.y) },
              { x: get(radius.x), y: get(radius.y) },
            ),
          () => {},
        );
      } else {
        return atom(
          (get) => get(radius),
          () => {},
        );
      }
    })();
  }
}

export type CircleRadius = Point | number | NumberAtom;

type CircleDisplayProps = {
  circle: Circle;
};

export const CircleDisplay: React.FC<CircleDisplayProps> = ({ circle }) => {
  const { transformX, transformY } = useBoardContext();
  const [x] = useAtom(circle.center.x);
  const [y] = useAtom(circle.center.y);
  const [radius] = useAtom(circle.radius);

  return (
    <ellipse
      cx={transformX(x)}
      cy={transformY(y)}
      rx={abs(transformX(radius))}
      ry={abs(transformY(radius))}
      strokeWidth={1}
      stroke="black"
      fill="transparent"
    />
  );
};
