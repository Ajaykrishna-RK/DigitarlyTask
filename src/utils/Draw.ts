// draw.ts

import type { Shape } from "../types/types";

export function drawShapes(
  ctx: CanvasRenderingContext2D,
  shapes: Shape[]
) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  for (const shape of shapes) {
    switch (shape.type) {
      case "free":
        ctx.beginPath();
        shape.points.forEach((p, i) =>
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
        );
        ctx.stroke();
        break;

      case "rect":
        ctx.strokeRect(
          shape.start.x,
          shape.start.y,
          shape.end.x - shape.start.x,
          shape.end.y - shape.start.y
        );
        break;

      case "circle": {
        const r = Math.hypot(
          shape.end.x - shape.start.x,
          shape.end.y - shape.start.y
        );
        ctx.beginPath();
        ctx.arc(shape.start.x, shape.start.y, r, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }

      case "line":
        ctx.beginPath();
        ctx.moveTo(shape.start.x, shape.start.y);
        ctx.lineTo(shape.end.x, shape.end.y);
        ctx.stroke();
        break;
    }
  }
}
