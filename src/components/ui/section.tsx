import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Section({
  className,
  children,
  tone = "light",
  ...props
}: HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  tone?: "light" | "cream" | "navy";
}) {
  const tones = {
    light: "bg-white text-navy",
    cream: "bg-cream text-navy",
    navy: "bg-navy text-white"
  };

  return <section className={cn("py-16 sm:py-20", tones[tone], className)} {...props}>{children}</section>;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gold">{eyebrow}</p> : null}
      <h2 className="font-heading text-3xl leading-tight text-current sm:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-current/75 sm:text-lg">{text}</p> : null}
    </div>
  );
}
