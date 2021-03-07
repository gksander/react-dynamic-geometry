import * as React from "react";
import { BoardElement, NumberAtom } from "../helper-types";
import { atom, useAtom } from "jotai";
import { useBoardContext } from "../GeometryBoard";

export class FunctionGraph implements BoardElement {
  fn: (x: number) => number;
  a: NumberAtom;
  b: NumberAtom;
  cfg: FunctionGraphConfiguration;

  constructor({
    fn,
    a,
    b,
    cfg = {},
  }: {
    fn: (x: number) => number;
    a?: number | NumberAtom;
    b?: number | NumberAtom;
    cfg?: FunctionGraphConfiguration;
  }) {
    this.fn = fn;

    this.a = (() => {
      if (!a) {
        return atom(
          () => -Infinity,
          () => {},
        );
      } else if (typeof a === "number") {
        return atom(
          () => a,
          () => {},
        );
      } else {
        return a;
      }
    })();

    this.b = (() => {
      if (!b) {
        return atom(
          () => Infinity,
          () => {},
        );
      } else if (typeof b === "number") {
        return atom(
          () => b,
          () => {},
        );
      } else {
        return b;
      }
    })();

    this.cfg = cfg;
  }

  Render = () => <FunctionGraphDisplay fnGraph={this} />;
}

type FunctionGraphConfiguration = Partial<React.SVGProps<SVGPathElement>>;

/**
 * Display
 */
type FunctionGraphDisplayProps = { fnGraph: FunctionGraph };
export const FunctionGraphDisplay: React.FC<FunctionGraphDisplayProps> = ({
  fnGraph,
}) => {
  const { xMin, xMax, transformX, transformY } = useBoardContext();
  const [a] = useAtom(fnGraph.a);
  const [b] = useAtom(fnGraph.b);

  const fnXMin = Math.max(a, xMin);
  const fnXMax = Math.min(b, xMax);

  const d = React.useMemo(() => {
    const step = 0.2;
    const pairs: { x: number; y: number }[] = [];
    for (let x = fnXMin; x < fnXMax; x += step) {
      pairs.push({ x, y: fnGraph.fn(x) });
    }
    pairs.push({ x: fnXMax, y: fnGraph.fn(fnXMax) });

    const [first, ...rest] = pairs;

    return [
      `M ${transformX(first.x)} ${transformY(first.y)}`,
      ...rest.map((v) => `L ${transformX(v.x)}, ${transformY(v.y)}`),
    ].join(" ");
  }, [fnXMin, fnXMax]);

  return (
    <path
      strokeWidth={1}
      stroke="black"
      fill="transparent"
      {...fnGraph.cfg}
      d={d}
    />
  );
};
