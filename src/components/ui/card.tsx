import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-brand border border-warmgray/70 bg-white p-6 shadow-soft",
        className
      )}
      {...props}
    />
  );
}
