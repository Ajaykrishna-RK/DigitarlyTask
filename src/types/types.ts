
export type Point = { x: number; y: number };

export type Shape =
  | { type: "free"; points: Point[] }
  | { type: "rect"; start: Point; end: Point }
  | { type: "circle"; start: Point; end: Point }
  | { type: "line"; start: Point; end: Point };

