import * as React from "react";
import { PointConfiguration } from "../elements/Point";
import { round } from "../utils/mathFns";
import { useBoardContext } from "../GeometryBoard";

type RawPointDisplayProps = {
  x: number;
  y: number;
  cfg: PointConfiguration;
  onPointerDown?: React.SVGProps<SVGCircleElement>["onPointerDown"];
};

export const RawPointDisplay: React.FC<RawPointDisplayProps> = ({
  x,
  y,
  cfg,
  onPointerDown,
}) => {
  const { transformX, transformY } = useBoardContext();
  const { size = 1.5, color = "blue", label, hideLabel } = cfg;
  const cx = transformX(x);
  const cy = transformY(y);

  if (cfg.hidden) {
    return null;
  }

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
      />
      {!hideLabel && (
        <text x={cx + 2} y={cy - 2} fontSize={4} textAnchor="start">
          {label
            ? label
            : `(${round({
                num: x,
                numDecimals: 3,
              })}, ${round({ num: y, numDecimals: 3 })})`}
        </text>
      )}
    </React.Fragment>
  );
};
