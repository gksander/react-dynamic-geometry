import * as React from "react";
import { Point } from "./Point";
import { useBoardContext } from "../GeometryBoard";
import { atom, useAtom } from "jotai";
import { distanceBetweenPoints } from "../utils/distanceBetweenPoints";
import { BoardElement, NumberAtom } from "../helper-types";
import { abs } from "../utils/mathFns";

export class Circle implements BoardElement {
  center: Point;
  radius: NumberAtom;
  cfg: CircleConfiguration;

  constructor({
    center,
    radius,
    cfg = {},
  }: {
    center: Point;
    radius: CircleRadius;
    cfg?: CircleConfiguration;
  }) {
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

    this.cfg = cfg;
  }

  Render = () => <CircleDisplay circle={this} />;
}

export type CircleRadius = Point | number | NumberAtom;
export type CircleConfiguration = Partial<React.SVGProps<SVGEllipseElement>>;

type CircleDisplayProps = {
  circle: Circle;
};

const CircleDisplay: React.FC<CircleDisplayProps> = ({ circle }) => {
  const { transformX, transformY } = useBoardContext();
  const [x] = useAtom(circle.center.x);
  const [y] = useAtom(circle.center.y);
  const [radius] = useAtom(circle.radius);

  return (
    <ellipse
      strokeWidth={1}
      stroke="black"
      fill="transparent"
      fillOpacity={0.9}
      {...circle.cfg}
      cx={transformX(x)}
      cy={transformY(y)}
      rx={abs(transformX(radius))}
      ry={abs(transformY(radius))}
    />
  );
};
