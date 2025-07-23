import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, X, Plus } from "lucide-react";

function StringArrayField({ label, items, onChange, disabled, placeholder }) {
  const [draft, setDraft] = React.useState("");

  const addItem = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...(items || []), v]);
    setDraft("");
  };

  const removeAt = (idx) => {
    const next = items.filter((_, i) => i !== idx);
    onChange(next);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold">{label}</Label>

      {/* Chips */}
      {items?.length ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-1 text-sm border rounded-md"
            >
              {item}
              <button
                type="button"
                disabled={disabled}
                onClick={() => removeAt(i)}
                className="text-destructive hover:text-destructive/80"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs italic text-muted-foreground">None added yet.</p>
      )}

      {/* Add new */}
      <div className="flex items-center gap-2 pt-1">
        <Input
          type="text"
          value={draft}
          disabled={disabled}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
        <Button
          type="button"
          size="sm"
          disabled={disabled || !draft.trim()}
          onClick={addItem}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>
    </div>
  );
}

export default StringArrayField;
