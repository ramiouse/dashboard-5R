export function StatCard({
  label,
  value,
  change,
  note,
  tone = "teal",
  delay = "",
}: {
  label: string;
  value: string;
  change: string;
  note: string;
  tone?: "teal" | "coral" | "indigo" | "gold";
  delay?: string;
}) {
  const colors = {
    teal: "bg-primary/10 text-primary",
    coral: "bg-accent/15 text-accent",
    indigo: "bg-[#5d6baf]/12 text-[#5665a6] dark:text-[#aeb8ed]",
    gold: "bg-[#d1a446]/15 text-[#a27920]",
  };

  return (
    <article
      data-testid={`card-stat-${label.toLowerCase().replaceAll(" ", "-")}`}
      className={`animate-rise ${delay} group rounded-2xl border border-card-border bg-card p-5 shadow-[0_8px_24px_hsl(227_27%_18%/.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_hsl(227_27%_18%/.08)]`}
    >
      <div className="mb-7 flex items-start justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[.1em] text-muted-foreground">
          {label}
        </span>
        <span
          className={`rounded-lg px-2 py-1 font-mono-ui text-[10px] font-medium ${colors[tone]}`}
        >
          {change}
        </span>
      </div>
      <p className="font-display text-[29px] font-semibold tracking-[-.05em]">
        {value}
      </p>
      <p className="mt-2 text-[11px] text-muted-foreground">{note}</p>
    </article>
  );
}
