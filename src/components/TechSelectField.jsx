import React, { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";

/**
 * options:  array of tech objects {_id, name, icon, color, ...}
 * value:    array of selected tech _id strings
 * onChange: (nextIds: string[]) => void
 * disabled: boolean
 */
export default function TechSelectField({
  options,
  value,
  onChange,
  disabled,
}) {
  const selected = Array.isArray(value) ? value : [];

  const optionMap = useMemo(() => {
    const map = new Map();
    (options || []).forEach((t) => map.set(t._id, t));
    return map;
  }, [options]);

  const isSelected = (id) => selected.includes(id);

  const toggle = (id) => {
    if (disabled) return;
    if (isSelected(id)) {
      onChange(selected.filter((x) => x !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const clearAll = () => {
    if (disabled) return;
    onChange([]);
  };

  // Selected tech objects (for chip display)
  const selectedTechs = selected.map((id) => optionMap.get(id)).filter(Boolean);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Label className="text-base font-semibold">Tech Stack</Label>
        {selected.length > 0 && (
          <Button
            type="button"
            size="xs"
            variant="ghost"
            disabled={disabled}
            onClick={clearAll}
            className="h-auto px-1 py-0 text-xs"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Selected chips */}
      {selectedTechs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTechs.map((t) => (
            <button
              key={t._id}
              type="button"
              disabled={disabled}
              onClick={() => toggle(t._id)}
              className="group flex items-center gap-1 rounded-full border px-2 py-1 text-xs transition-colors hover:bg-destructive/10"
              style={{ borderColor: t.color || undefined }}
              title="Click to remove"
            >
              {t.icon ? (
                <img
                  src={t.icon}
                  alt={t.name}
                  className="h-4 w-4 object-contain"
                />
              ) : null}
              <span>{t.name}</span>
              {!disabled && (
                <X className="h-3 w-3 opacity-70 group-hover:opacity-100" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* All options grid */}
      <div className="flex flex-wrap gap-2">
        {(options || []).map((t) => {
          const active = isSelected(t._id);
          return (
            <Button
              key={t._id}
              type="button"
              size="sm"
              variant={active ? "default" : "outline"}
              disabled={disabled}
              onClick={() => toggle(t._id)}
              className="flex items-center gap-2"
              style={
                active && t.color
                  ? {
                      backgroundColor: t.color,
                      borderColor: t.color,
                      color: "#000", // readable; tweak if needed
                    }
                  : undefined
              }
            >
              {t.icon ? (
                <img
                  src={t.icon}
                  alt={t.name}
                  className="h-4 w-4 object-contain"
                />
              ) : null}
              <span>{t.name}</span>
              {active && <Check className="h-4 w-4" />}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
