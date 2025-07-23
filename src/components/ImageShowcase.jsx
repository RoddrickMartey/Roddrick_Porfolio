import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils"; // optional; remove if not using

/**
 * Display-only image showcase with a laptop-ish default aspect ratio.
 * No click handler. No pointer cursor. Good for hero / gallery display.
 */
export default function ImageShowcase({
  src,
  alt = "",
  caption,
  ratio = 1 / 1,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.01, rotate: 0.15 }}
      className={cn(
        "relative group inline-block w-full max-w-md cursor-default select-none",
        className
      )}
    >
      {/* Glow / halo */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-xl blur-xl group-hover:opacity-100 bg-gradient-to-tr from-primary/40 via-primary/10 to-secondary/40"
        aria-hidden="true"
      />

      {/* Frame */}
      <div className="relative z-10 rounded-xl overflow-hidden border border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <AspectRatio ratio={ratio}>
          <img
            src={src}
            alt={alt}
            className="object-cover w-full h-full"
            loading="lazy"
          />

          {caption && (
            <div className="absolute inset-x-0 bottom-0 flex items-end px-4 pt-12 pb-3 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
              <p className="text-sm font-medium text-foreground drop-shadow">
                {caption}
              </p>
            </div>
          )}
        </AspectRatio>
      </div>
    </motion.div>
  );
}
