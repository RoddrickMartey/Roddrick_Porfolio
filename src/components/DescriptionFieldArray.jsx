import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, X, Plus } from "lucide-react";

export default function DescriptionFieldArray({ value, onChange, disabled }) {
  const description = Array.isArray(value) ? value : [""];

  const updateAt = (idx, newVal) => {
    const next = [...description];
    next[idx] = newVal;
    onChange(next);
  };

  const addPara = () => {
    onChange([...description, ""]);
  };

  const removeAt = (idx) => {
    const next = description.filter((_, i) => i !== idx);
    onChange(next.length ? next : [""]);
  };

  const move = (from, to) => {
    if (to < 0 || to >= description.length) return;
    const next = [...description];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">Description</Label>
      {description.map((para, i) => (
        <div key={i} className="flex items-start gap-2">
          <Textarea
            value={para}
            disabled={disabled}
            onChange={(e) => updateAt(i, e.target.value)}
            rows={4}
            className="flex-1"
          />
          <div className="flex flex-col gap-1 pt-1">
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
              disabled={disabled || i === description.length - 1}
              onClick={() => move(i, i + 1)}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="destructive"
              disabled={disabled || description.length === 1}
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
        onClick={addPara}
        className="flex items-center gap-1"
      >
        <Plus className="w-4 h-4" />
        Add paragraph
      </Button>
    </div>
  );
}
