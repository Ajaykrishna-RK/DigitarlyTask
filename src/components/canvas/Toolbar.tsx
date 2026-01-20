import Button from "../ui/Button";
type ToolbarProps = {
  undo: () => void;
  redo: () => void;
  deleteSelected: () => void;
  exportJSON: () => void;

clearAll:()=>void;
  canUndo: () => void;
  canRedo:  () => void;
  hasSelection: boolean;
  hasShapes: boolean;
};

export default function Toolbar({
  undo,
  redo,
  deleteSelected,
  exportJSON,

  canUndo,
  canRedo,
  clearAll,
  hasSelection,
  hasShapes,
}: ToolbarProps) {
  return (
    <div
className="w-full justify-start gap-4 flex-wrap items-center flex"
    >
      <Button   onClick={undo} disabled={!canUndo}>
        Undo
      </Button>

      <Button onClick={redo} disabled={!canRedo}>
        Redo
      </Button>

      <Button variant="danger" onClick={deleteSelected} disabled={!hasSelection}>
        Delete Selected
      </Button>
    <Button  onClick={clearAll} >
        Clear All
      </Button>
      <Button variant="secondary"  onClick={exportJSON} disabled={!hasShapes}>
        Export JSON
      </Button>

    </div>
  );
}
