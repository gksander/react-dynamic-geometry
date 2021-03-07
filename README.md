# React Dynamic Geometry

A dynamic geometry library built on top of [React.js](https://reactjs.org/) and [Jotai](https://github.com/pmndrs/jotai). Easily create geometry "boards" with dynamic elements.

## Sample

The following code:

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

## WARNING

This project is still in the phase of "just playing around". I'm having fun building out geometric constructs, but do have plans to make this a more serious project once a few more ideas are fleshed out.

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
- [ ] Midpoint
- [ ] Center of Polygon (whatever that's called)
- [ ] Function graph/curve
- [ ] Parabola
- [ ] Perpendicular
- [ ] Reflection across line
- [ ] Regular Polygon
- [ ] Sector
- [ ] Glider point to curve or object? That seems hard...
