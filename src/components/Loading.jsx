import React from "react";
import { OrbitProgress } from "react-loading-indicators";
import { Label } from "./ui/label";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <OrbitProgress
        color="oklch(0.723 0.219 149.579)" // Slate-900 (or use currentColor)
        size="large"
      />
      <Label className="mt-4 text-lg font-semibold">Loading...</Label>
    </div>
  );
}
