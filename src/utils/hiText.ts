import type { Point, Shape } from "../types/types";

export function hitTest(shape: Shape, p: Point): boolean {
  switch (shape.type) {
    case "free":
      return shape.points.some(
        pt => Math.hypot(pt.x - p.x, pt.y - p.y) < 6
      );

    case "rect": {
      const x1 = Math.min(shape.start.x, shape.end.x);
      const x2 = Math.max(shape.start.x, shape.end.x);
      const y1 = Math.min(shape.start.y, shape.end.y);
      const y2 = Math.max(shape.start.y, shape.end.y);
      return p.x >= x1 && p.x <= x2 && p.y >= y1 && p.y <= y2;
    }

    case "circle": {
      const r = Math.hypot(
        shape.end.x - shape.start.x,
        shape.end.y - shape.start.y
      );
      const d = Math.hypot(p.x - shape.start.x, p.y - shape.start.y);
      return d <= r;
    }

    case "line": {
      const { start, end } = shape;
      const distance =
        Math.abs(
          (end.y - start.y) * p.x -
            (end.x - start.x) * p.y +
            end.x * start.y -
            end.y * start.x
        ) /
        Math.hypot(end.y - start.y, end.x - start.x);

      return distance < 6; // tolerance
    }

    default:
      return false;
  }
}