"use client";

import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes
} from "react";
import { cn } from "@/lib/utils";

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-semibold uppercase tracking-[0.08em] text-navy", className)}
      {...props}
    />
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-brand border border-warmgray bg-white px-4 py-3 text-base text-navy outline-none transition placeholder:text-navy/45 focus:border-gold focus:ring-2 focus:ring-gold/20",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-brand border border-warmgray bg-white px-4 py-3 text-base text-navy outline-none transition placeholder:text-navy/45 focus:border-gold focus:ring-2 focus:ring-gold/20",
        className
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      className={cn(
        "min-h-11 w-full rounded-brand border border-warmgray bg-white px-4 py-3 text-base text-navy outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function ErrorMessage({ children }: { children?: ReactNode }) {
  if (!children) {
    return null;
  }

  return <p className="mt-2 text-sm font-medium text-red-700">{children}</p>;
}
