import { WritableAtom } from "jotai";

export type IPoint = { x: number; y: number };
export type CoordinateTransformer = (x: number) => number;
export type NumberAtom = WritableAtom<number, number>;
