
import { useEffect, useRef } from "react";

type CanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  draw: (ctx: CanvasRenderingContext2D) => void;
};

export default function Canvas({ draw, ...props }: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    draw(ctx);
  }, [draw]);

  return <canvas ref={ref} {...props} />;
}
