import { useCallback, useState } from "react";
import Canvas from "./Canvas";
import { drawShapes } from "../../utils/Draw";
import type { Shape, Point } from "../../types/types";
import { hitTest } from "../../utils/hiText";
import Toolbar from "./Toolbar";

type Tool = "free" | "rect" | "circle" | "line";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;

export default function DrawingCanvas({ tool }: { tool: Tool }) {
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [current, setCurrent] = useState<Shape | null>(null);

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [dragOffset, setDragOffset] = useState<Point | null>(null);

    const [undoStack, setUndoStack] = useState<Shape[][]>([]);
    const [redoStack, setRedoStack] = useState<Shape[][]>([]);

    const getPoint = (e: React.MouseEvent): Point => ({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
    });

    const draw = useCallback(
        (ctx: CanvasRenderingContext2D) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            drawShapes(ctx, shapes);

            if (current) {
                drawShapes(ctx, [current]);
            }

            // draw selection outline
            if (selectedIndex !== null) {
                const s = shapes[selectedIndex];
                if (s && "start" in s && "end" in s) {
                    ctx.setLineDash([6, 4]);
                    ctx.strokeStyle = "blue";
                    ctx.strokeRect(
                        s.start.x,
                        s.start.y,
                        s.end.x - s.start.x,
                        s.end.y - s.start.y
                    );
                    ctx.setLineDash([]);
                }
            }
        },
        [shapes, current, selectedIndex]
    );

    // Mouse Events

    function onMouseDown(e: React.MouseEvent) {
        const p = getPoint(e);

        // Try selecting existing shape (top-most)
        for (let i = shapes.length - 1; i >= 0; i--) {
            const shape = shapes[i];

            if (hitTest(shape, p)) {
                setSelectedIndex(i);

                if (shape.type !== "free") {
                    setDragOffset({
                        x: p.x - shape.start.x,
                        y: p.y - shape.start.y,
                    });
                } else {
                    setDragOffset(null);
                }

                return;
            }
        }


        // No selection → start drawing
        setSelectedIndex(null);

        if (tool === "free") {
            setCurrent({ type: "free", points: [p] });
        } else {
            setCurrent({ type: tool, start: p, end: p } as Shape);
        }
    }

    function onMouseMove(e: React.MouseEvent) {
        const p = getPoint(e);

        // Drag selected shape
        if (selectedIndex !== null && dragOffset) {
            setShapes(prev =>
                prev.map((s, i) => {
                    if (i !== selectedIndex || !("start" in s)) return s;

                    const dx = s.end.x - s.start.x;
                    const dy = s.end.y - s.start.y;

                    return {
                        ...s,
                        start: {
                            x: p.x - dragOffset.x,
                            y: p.y - dragOffset.y,
                        },
                        end: {
                            x: p.x - dragOffset.x + dx,
                            y: p.y - dragOffset.y + dy,
                        },
                    };
                })
            );
            return;
        }

        // Draw preview
        if (!current) return;

        if (current.type === "free") {
            setCurrent({
                ...current,
                points: [...current.points, p],
            });
        } else {
            setCurrent({ ...current, end: p });
        }
    }

    function onMouseUp() {
        setDragOffset(null);

        if (!current) return;

        setUndoStack(u => [...u, shapes]);
        setRedoStack([]);

        setShapes(s => [...s, current]);
        setCurrent(null);
    }

    // click Events

    function undo() {
        if (!undoStack.length) return;

        const prev = undoStack[undoStack.length - 1];
        setRedoStack(r => [shapes, ...r]);
        setUndoStack(u => u.slice(0, -1));
        setShapes(prev);
        setSelectedIndex(null);
    }

    function redo() {
        if (!redoStack.length) return;

        const next = redoStack[0];
        setUndoStack(u => [...u, shapes]);
        setRedoStack(r => r.slice(1));
        setShapes(next);
        setSelectedIndex(null);
    }

    function deleteSelected() {
        if (selectedIndex === null) return;

        setUndoStack(u => [...u, shapes]);
        setRedoStack([]);

        setShapes(s => s.filter((_, i) => i !== selectedIndex));
        setSelectedIndex(null);
    }
    function clearAll() {
        ;
        setShapes([]);

    }

    function exportJSON() {
        const data = JSON.stringify(shapes, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "canvas.json";
        a.click();

        URL.revokeObjectURL(url);
    }

    return (
        <div className="w-full">

            <Toolbar
                undo={undo}
                redo={redo}
                deleteSelected={deleteSelected}
                clearAll={clearAll}
                exportJSON={exportJSON}
              
                canUndo={undo}
                canRedo={redo}
                hasSelection={selectedIndex !== null}
                hasShapes={shapes.length > 0}
            />




            <Canvas
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                draw={draw}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                style={{
                    border: "1px solid #ccc",
                    width: "100%",
                    marginTop: "20px",
                    maxWidth: CANVAS_WIDTH,
                    height: CANVAS_HEIGHT,
                    cursor: selectedIndex !== null ? "move" : "crosshair",
                }}
            />
        </div>
    );
}
