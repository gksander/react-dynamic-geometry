import * as React from "react";
import { WritableAtom } from "jotai";

export interface BoardElement {
  Render: React.FC<{ index: number }>;
}

export type IPoint = { x: number; y: number };
export type CoordinateTransformer = (x: number) => number;
export type NumberAtom = WritableAtom<number, number>;
