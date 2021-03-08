import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { GeometryBoard } from "../src";
import { makeTransformers } from "./utils/transformers";
import { BASE_BOARD_CONFIG } from "./utils/test-consts";
import { BoardGenerator } from "../src/GeometryBoard";

describe("Point", () => {
  it("should place the point correctly", () => {
    const { transformX, transformY } = setup((build) => {
      build("Point", { x: 3, y: 5, cfg: { label: "A" } });
      build("Point", { x: -5, y: -1.32, cfg: { label: "B" } });
    });

    const pointA = screen.getByLabelText("Point A");
    expect(Number(pointA?.getAttribute("cx"))).toBeCloseTo(transformX(3));
    expect(Number(pointA?.getAttribute("cy"))).toBeCloseTo(transformY(5));

    const pointB = screen.getByLabelText("Point B");
    expect(Number(pointB?.getAttribute("cx"))).toBeCloseTo(transformX(-5));
    expect(Number(pointB?.getAttribute("cy"))).toBeCloseTo(transformY(-1.32));
  });

  it("should display label", () => {
    setup((build) => {
      build("Point", { x: 3, y: 3 });
      build("Point", { x: -5, y: 5, cfg: { label: "foobar" } });
    });

    expect(screen.queryByText("(3, 3)")).toBeTruthy();
    expect(screen.queryByText("foobar")).toBeTruthy();
  });

  it("should hide point when cfg.hidden is true", () => {
    setup((build) => {
      build("Point", { x: 3, y: 3, cfg: { hidden: true, label: "A" } });
      build("Point", { x: 4, y: 4, cfg: { label: "B" } });
    });

    expect(screen.queryByLabelText("Point A")).toBeNull();
    expect(screen.queryByLabelText("Point B")).toBeTruthy();
  });

  it("should color point with cfg.color", () => {
    setup((build) => {
      build("Point", { x: 3, y: 3, cfg: { color: "blue" } });
    });

    const el = screen.queryByLabelText("Point (3, 3)");
    expect(el?.getAttribute("fill")).toBe("blue");
  });

  // TODO: Test that you can drag point
});

const setup = (buildFn: BoardGenerator) => {
  const { transformX, transformY } = makeTransformers(BASE_BOARD_CONFIG);
  const { container } = render(
    <GeometryBoard config={BASE_BOARD_CONFIG}>{buildFn}</GeometryBoard>,
  );

  return { transformX, transformY, container };
};
