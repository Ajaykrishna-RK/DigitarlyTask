
import { useState } from "react";
import DrawingCanvas from "./DrawingCanvas";
import { TOOL_ICONS } from "../../constants/data";
import Button from "../ui/Button";


export default function CanvasContainer() {
  const [tool, setTool] = useState<"free" | "rect" | "circle" | "line">("free");

  return (
    <div  className=" p-5 max-w-[1440px]  w-full mx-auto">
   <div className="flex gap-2  mb-3">
      {TOOL_ICONS.map(({ type, icon, label }) => (
        <Button
          key={type}
          onClick={() => setTool(type)}
          variant="secondary"
          active={tool === type}
          className="p-0"
          title={label}
        >
          {icon}
        </Button>
      ))}
    </div>

      <DrawingCanvas tool={tool} />
    </div>
  );
}
