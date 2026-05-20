import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const styles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-navy border border-gold hover:bg-navy hover:text-white hover:border-navy",
  secondary:
    "bg-transparent text-navy border border-navy hover:bg-navy hover:text-white",
  ghost:
    "bg-transparent text-navy border border-transparent hover:border-gold hover:text-navy"
};

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & SharedProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-brand px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        styles[variant],
        className
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & SharedProps & { href: string }) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-brand px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2",
        styles[variant],
        className
      )}
      {...props}
    />
  );
}
