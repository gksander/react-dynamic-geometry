import * as React from "react";

type ArrowHeadMarkerDefsProps = {
  id: string;
  color: string;
};

export const ArrowHeadMarkerDefs: React.FC<ArrowHeadMarkerDefsProps> = ({
  id,
  color,
}) => {
  return (
    <defs>
      <marker
        id={`arrowEnd-${id}`}
        orient="auto"
        markerWidth={ARROW_HEAD_SIZE}
        markerHeight={ARROW_HEAD_SIZE * 2}
        refX={ARROW_HEAD_SIZE}
        refY={ARROW_HEAD_SIZE}
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M0,0 V${
            2 * ARROW_HEAD_SIZE
          } L${ARROW_HEAD_SIZE},${ARROW_HEAD_SIZE} Z`}
          fill={color}
        />
      </marker>
      <marker
        id={`arrowStart-${id}`}
        orient="auto"
        markerWidth={ARROW_HEAD_SIZE}
        markerHeight={ARROW_HEAD_SIZE * 2}
        refX={0}
        refY={ARROW_HEAD_SIZE}
        markerUnits="userSpaceOnUse"
      >
        <path
          d={`M${ARROW_HEAD_SIZE},0 V${
            2 * ARROW_HEAD_SIZE
          } L0,${ARROW_HEAD_SIZE} Z`}
          fill={color}
        />
      </marker>
    </defs>
  );
};

const ARROW_HEAD_SIZE = 2;
