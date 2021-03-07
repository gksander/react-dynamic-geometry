# React Dynamic Geometry

A dynamic geometry library built on top of [React.js](https://reactjs.org/), [Jotai](https://github.com/pmndrs/jotai), and rendered with SVG. Easily create geometry "boards" with dynamic elements. Jotai is used for fine-grained state updates to keep dynamic boards performant.

Here's a cute sample. The following code:

```jsx
<GeometryBoard>
  {(build) => {
    build("Axes", {});

    const A = build("Point", { x: 2, y: 2, cfg: { label: "A" } });
    const B = build("Point", { x: -3, y: 3 });
    const O = build("Point", { x: -5, y: 8 });

    build("Line", { start: A, end: B });
    build("Circle", { center: B, radius: A.x });
    build("Polygon", {
      vertices: [A, B, O],
      cfg: { fill: "red", fillOpacity: 0.5 },
    });
  }}
</GeometryBoard>
```

Generates the following dynamic geometry board.

![Sample of dynamic geometry board](./docs/img/rdg-demo.gif)

## Setup

If you're working inside a React project, all you need to do is install this library.

```shell
# For NPM
npm install react-dynamic-geometry

# For Yarn
yarn add react-dynamic-geometry
```

Once the library is installed, import the `GeometryBoard` component from this library, and go to town!

```jsx
import { GeometryBoard } from 'react-dynamic-geometry';

const MyFirstBoard = () => (
  <GeometryBoard>
    {(build) => {
      build("Point", { x: 3, y: 5, cfg: { label: "Hello world!" } });
    }}
  </GeometryBoard>
)
```

## API

This library exports a single component, `GeometryBoard`, that takes a "builder" function as its sole child. The library exposes a handful of helpers for you to build dynamic geometry boards (via this builder function).

Here's a small example to give you a taste of how to use the library:

```jsx
<GeometryBoard>
  {(build) => {
    const A = build("Point", { x: 0, y: 0 });
    const B = build("Point", { x: 3, y: 5 });
    build("Line", { start: A, end: B });
  }}
</GeometryBoard>
```

The builder function is strongly-typed, so your editor should give you some intellisense about what types of elements you can construct, and what their options are. The following documentation attempts to do this explicitly.

### Axes

### Point

### Line

### Line Segment

### Circle

### Polygon

### FunctionGraph

### ParallelLine

### PerpendicularLine

### Midpoint

### Incenter

### Incircle

## Feedback Welcome

Does this thing interest you? Hit me up! I want to hear your ideas.

## TODO:

- [ ] Testing setup...
- [ ] Method for documentation.
- [ ] GitHub actions for publishing to NPM on commits to main?
- [ ] Customizable axes

### Elements to Create

- [ ] Arc?
- [ ] Bisector?
- [ ] Circumcircle and Circumcenter?
- [x] Midpoint
- [ ] Center of Polygon (whatever that's called)
- [x] Function graph/curve
- [ ] Parabola
- [x] Perpendicular
- [ ] Reflection across line
- [ ] Regular Polygon
- [ ] Sector
- [ ] Glider point to curve or object? That seems hard...
