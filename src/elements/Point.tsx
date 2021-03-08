import * as React from "react";
import { atom, useAtom, WritableAtom } from "jotai";
import { useBoardContext } from "../GeometryBoard";
import { BoardElement, IPoint, NumberAtom } from "../helper-types";
import { RawPointDisplay } from "../components/RawPointDisplay";

/**
 * Point class
 */
export class Point implements BoardElement {
  x: NumberAtom;
  y: NumberAtom;
  coordsAtom: WritableAtom<IPoint, (prev: IPoint) => IPoint>;
  cfg: PointConfiguration;

  constructor({
    x,
    y,
    cfg = {},
  }: {
    x: number | NumberAtom;
    y: number | NumberAtom;
    cfg?: PointConfiguration;
  }) {
    this.x =
      typeof x === "number"
        ? atom(x)
        : atom(
            (get) => get(x),
            () => {},
          );
    this.y =
      typeof y === "number"
        ? atom(y)
        : atom(
            (get) => get(y),
            () => {},
          );

    this.coordsAtom = atom(
      (get) => ({ x: get(this.x), y: get(this.y) }),
      (get, set, arg) => {
        const newCoords = arg({ x: get(this.x), y: get(this.y) });
        set(this.x, newCoords.x);
        set(this.y, newCoords.y);
      },
    );

    this.cfg = cfg;
  }

  Render = () => <PointDisplay point={this} />;
}

export type PointConfiguration = {
  size?: number; // Radius in svg units
  color?: string;
  label?: string;
  hideLabel?: boolean;
  hidden?: boolean;
};

/**
 * Point display
 */
type PointDisplayProps = {
  point: Point;
};
const PointDisplay: React.FC<PointDisplayProps> = ({ point }) => {
  const [_, setCoords] = useAtom(point.coordsAtom);
  const [x] = useAtom(point.x);
  const [y] = useAtom(point.y);

  const {
    transformX,
    transformY,
    untransformX,
    untransformY,
    svgRef,
  } = useBoardContext();

  /**
   * On pointer down:
   *  - Determine offset within the point.
   *  - Register move listener and update coordinates in live time
   *  - On pointer up/leave, remove event listeners
   */
  const handlePointerDown: React.PointerEventHandler<SVGCircleElement> = React.useCallback(
    (e) => {
      e.preventDefault();

      const pointerMove = (e: PointerEvent) => {
        e.preventDefault();
        if (!svgRef?.current) {
          return;
        }

        const tmpPoint = svgRef.current.createSVGPoint();
        tmpPoint.x = e.clientX;
        tmpPoint.y = e.clientY;
        const cursor = tmpPoint.matrixTransform(
          svgRef?.current?.getScreenCTM()?.inverse(),
        );

        setCoords(() => ({
          x: untransformX(cursor.x),
          y: untransformY(cursor.y),
        }));
      };

      const pointerUp = () => {
        svgRef?.current?.removeEventListener("pointermove", pointerMove);
        svgRef?.current?.removeEventListener("pointerup", pointerUp);
        svgRef?.current?.removeEventListener("pointerleave", pointerUp);
      };

      svgRef?.current?.addEventListener("pointermove", pointerMove);
      svgRef?.current?.addEventListener("pointerup", pointerUp);
      svgRef?.current?.addEventListener("pointerleave", pointerUp);
    },
    [transformX, transformY, untransformX, untransformY],
  );

  return <RawPointDisplay point={point} onPointerDown={handlePointerDown} />;
};
