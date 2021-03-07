import * as React from "react";
import { BoardElement, CoordinateTransformer } from "./helper-types";
import { Provider } from "jotai";
import { Builder, BuildFn } from "./elements/Builder";

/**
 * API for using board
 */
export const GeometryBoard: React.FC<{
  children: BoardGenerator;
  config?: BoardConfig;
}> = ({
  config: { xMin = -10, xMax = 10, yMin = -10, yMax = 10 } = {},
  children,
}) => {
  const [elements, setElements] = React.useState<BoardElement[]>([]);
  const svgRef = React.useRef<SVGSVGElement>(null);

  /**
   * Building board based on generating fn
   */
  React.useEffect(() => {
    const builder = new Builder();
    children(builder.build);
    setElements(builder.sortedElements);
  }, []);

  /**
   * Provide some values so components can do _maths_
   */
  const value: BoardContextValue = React.useMemo(() => {
    const transformX: CoordinateTransformer = (xCartesian: number): number =>
      -SIZE + ((xCartesian - xMin) / (xMax - xMin)) * 2 * SIZE;
    const untransformX: CoordinateTransformer = (xSvg) =>
      ((xSvg + SIZE) / (2 * SIZE)) * (xMax - xMin) + xMin;

    const transformY: CoordinateTransformer = (yCartesian: number): number =>
      SIZE - ((yCartesian - yMin) / (yMax - yMin)) * 2 * SIZE;
    const untransformY: CoordinateTransformer = (ySvg) =>
      ((SIZE - ySvg) / (2 * SIZE)) * (yMax - yMin) + yMin;

    return {
      transformX,
      untransformX,
      transformY,
      untransformY,
      xMin,
      xMax,
      yMin,
      yMax,
      svgRef,
    };
  }, [xMin, xMax, yMin, yMax]);

  return (
    <Provider>
      <BoardContext.Provider value={value}>
        <svg viewBox={`${-SIZE} ${-SIZE} ${2 * SIZE} ${2 * SIZE}`} ref={svgRef}>
          {elements.map((el, i) => (
            <el.Render index={i} key={i} />
          ))}
        </svg>
      </BoardContext.Provider>
    </Provider>
  );
};

const SIZE = 50;

type BoardGenerator = (build: BuildFn) => void;

type BoardConfig = {
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
};

type BoardContextValue = {
  transformX: CoordinateTransformer;
  transformY: CoordinateTransformer;
  untransformX: CoordinateTransformer;
  untransformY: CoordinateTransformer;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  svgRef: React.MutableRefObject<SVGSVGElement | null> | null;
};
const BoardContext = React.createContext<BoardContextValue>({
  transformX: (x) => x,
  transformY: (y) => y,
  untransformX: (x) => x,
  untransformY: (y) => y,
  xMin: 0,
  xMax: 0,
  yMin: 0,
  yMax: 0,
  svgRef: null,
});

export const useBoardContext = () => React.useContext(BoardContext);
