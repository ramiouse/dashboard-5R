import type { ReactNode } from "react";

export function PageHeading({
  eyebrow,
  title,
  detail,
  action,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div className="animate-rise">
        <p className="mb-2 font-mono-ui text-[10px] uppercase tracking-[.2em] text-primary">
          {eyebrow}
        </p>
        <h1 className="font-display text-[clamp(28px,4vw,42px)] font-semibold leading-none tracking-[-.055em] text-foreground">
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-muted-foreground">
          {detail}
        </p>
      </div>
      {action}
    </div>
  );
}
