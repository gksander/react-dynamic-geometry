import * as React from "react";
import { Point } from "../elements/Point";
import { round } from "../utils/mathFns";
import { useBoardContext } from "../GeometryBoard";
import { useAtom } from "jotai";

type RawPointDisplayProps = {
  point: Point;
  onPointerDown?: React.SVGProps<SVGCircleElement>["onPointerDown"];
};

export const RawPointDisplay: React.FC<RawPointDisplayProps> = ({
  point,
  onPointerDown,
}) => {
  const { transformX, transformY } = useBoardContext();
  const [x] = useAtom(point.x);
  const [y] = useAtom(point.y);
  const { size = 1.5, color = "blue", label, hideLabel } = point.cfg;
  const cx = transformX(x);
  const cy = transformY(y);

  if (point.cfg.hidden || isNaN(x) || isNaN(y)) {
    return null;
  }

  const theLabel = label
    ? label
    : `(${round({
        num: x,
        numDecimals: 3,
      })}, ${round({ num: y, numDecimals: 3 })})`;

  return (
    <React.Fragment>
      <circle
        cx={cx}
        cy={cy}
        r={size}
        fill={color}
        fillOpacity={0.9}
        stroke={color}
        strokeWidth={1}
        onPointerDown={onPointerDown}
        style={{
          cursor: typeof onPointerDown === "function" ? "pointer" : "auto",
        }}
        aria-label={`Point ${theLabel}`}
      />
      {!hideLabel && (
        <text x={cx + 2} y={cy - 2} fontSize={4} textAnchor="start">
          {theLabel}
        </text>
      )}
    </React.Fragment>
  );
};
