import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, X, Plus } from "lucide-react";

export default function ExtraTechFieldArray({ value, onChange, disabled }) {
  const extraTech = Array.isArray(value) ? value : [""];

  const updateAt = (idx, newVal) => {
    const next = [...extraTech];
    next[idx] = newVal;
    onChange(next);
  };

  const addTech = () => {
    onChange([...extraTech, ""]);
  };

  const removeAt = (idx) => {
    const next = extraTech.filter((_, i) => i !== idx);
    onChange(next.length ? next : [""]);
  };

  const move = (from, to) => {
    if (to < 0 || to >= extraTech.length) return;
    const next = [...extraTech];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">Extra Tech</Label>
      {extraTech.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={item}
            disabled={disabled}
            onChange={(e) => updateAt(i, e.target.value)}
            placeholder="e.g., Tailwind CSS"
            className="flex-1"
          />
          <div className="flex flex-col gap-1">
            <Button
              type="button"
              size="icon"
              variant="outline"
              disabled={disabled || i === 0}
              onClick={() => move(i, i - 1)}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              disabled={disabled || i === extraTech.length - 1}
              onClick={() => move(i, i + 1)}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="destructive"
              disabled={disabled || extraTech.length === 1}
              onClick={() => removeAt(i)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={disabled}
        onClick={addTech}
        className="flex items-center gap-1"
      >
        <Plus className="w-4 h-4" />
        Add Tech
      </Button>
    </div>
  );
}
