"use client";

import { RefreshCw } from "lucide-react";

export function ErrorState({
  onRetry,
  title = "Data belum tersedia",
}: {
  onRetry: () => void;
  title?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-12 text-center">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
        <RefreshCw size={17} />
      </div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 max-w-xs text-xs text-muted-foreground">
        Ada kendala saat mengambil data terbaru.
      </p>
      <button
        data-testid="button-retry-data"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        Coba lagi
      </button>
    </div>
  );
}
