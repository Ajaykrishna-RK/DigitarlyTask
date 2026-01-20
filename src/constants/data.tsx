import React from "react";

export type ToolType = "free" | "rect" | "circle" | "line";

export type ToolIcon = {
  type: ToolType;
  label: string;
  icon: React.ReactNode;
};

export const TOOL_ICONS: ToolIcon[] = [
  {
    type: "free",
    label: "Free draw",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>

    ),
  },
  {
    type: "rect",
    label: "Rectangle",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" />
      </svg>
    ),
  },
  {
    type: "circle",
    label: "Circle",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    type: "line",
    label: "Line",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="4" y1="20" x2="20" y2="4" />
      </svg>
    ),
  },
];
