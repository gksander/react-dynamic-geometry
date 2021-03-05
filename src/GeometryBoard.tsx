import * as React from "react";
import { Point, PointConfiguration, PointDisplay } from "./elements/Point";
import { CoordinateTransformer, NumberAtom } from "./helper-types";
import { Provider } from "jotai";
import { Axes, AxesDisplay } from "./elements/Axes";
import { LineSegment, LineSegmentDisplay } from "./elements/LineSegment";
import { Line, LineDisplay } from "./elements/Line";
import { Circle, CircleDisplay, CircleRadius } from "./elements/Circle";
import { Polygon, PolygonDisplay } from "./elements/Polygon";

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
    const newElements: BoardElement[] = [];
    const addElement: <T>(el: T) => T = (el) => {
      newElements.push(el);
      return el;
    };

    const axes = () => addElement(new Axes());
    const point = (
      x: number | NumberAtom,
      y: number | NumberAtom,
      cfg?: PointConfiguration,
    ) => addElement(new Point(x, y, cfg));
    const lineSegment = (start: Point, end: Point) =>
      addElement(new LineSegment(start, end));
    const line = (start: Point, end: Point) => addElement(new Line(start, end));
    const circle = (center: Point, radius: CircleRadius) =>
      addElement(new Circle(center, radius));
    const polygon = (vertices: Point[]) => addElement(new Polygon(vertices));

    children({ point, axes, lineSegment, line, circle, polygon });

    setElements(
      newElements.sort((a, b) => {
        if (a instanceof Point) {
          return 1;
        }
        if (b instanceof Point) {
          return -1;
        }
        return 0;
      }),
    );
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
          {elements.map((el, i) => {
            if (el instanceof Axes) {
              return <AxesDisplay key={i} />;
            } else if (el instanceof Point && !el?.cfg?.hidden) {
              return <PointDisplay point={el} key={i} />;
            } else if (el instanceof LineSegment) {
              return <LineSegmentDisplay lineSegment={el} key={i} />;
            } else if (el instanceof Line) {
              return <LineDisplay line={el} key={i} />;
            } else if (el instanceof Circle) {
              return <CircleDisplay circle={el} key={i} />;
            } else if (el instanceof Polygon) {
              return <PolygonDisplay polygon={el} key={i} />;
            }
          })}
        </svg>
      </BoardContext.Provider>
    </Provider>
  );
};

const SIZE = 50;

type BoardElement = Axes | Point | LineSegment | Line | Circle | Polygon;

type BoardGenerator = (helpers: {
  axes: () => Axes;
  point: (
    x: number | NumberAtom,
    y: number | NumberAtom,
    cfg?: PointConfiguration,
  ) => Point;
  lineSegment: (start: Point, end: Point) => LineSegment;
  line: (start: Point, end: Point) => Line;
  circle: (center: Point, radius: CircleRadius) => Circle;
  polygon: (vertices: Point[]) => Polygon;
}) => void;

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
