import React from "react";
import { LifeLine } from "react-loading-indicators";

export default function Error({ message = "Something went wrong." }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <LifeLine
        color="#DC2626" // Red-600
        size="large"
      />
      <p className="mt-4 text-lg font-semibold text-red-600 dark:text-red-400">
        {message}
      </p>
    </div>
  );
}
