export function Chart({
  chart,
}: {
  chart: Array<{ label: string; value: number }>;
}) {
  const points = chart.length
    ? chart
    : [
        { label: "Mon", value: 42 },
        { label: "Tue", value: 55 },
        { label: "Wed", value: 48 },
        { label: "Thu", value: 66 },
        { label: "Fri", value: 58 },
        { label: "Sat", value: 74 },
        { label: "Sun", value: 81 },
      ];

  const max = Math.max(...points.map((p) => p.value), 1);
  const min = Math.min(...points.map((p) => p.value), 0);
  const range = max - min || 1;
  const coords = points
    .map(
      (p, i) =>
        `${(i / Math.max(points.length - 1, 1)) * 100},${96 - ((p.value - min) / range) * 70}`,
    )
    .join(" ");
  const area = `0,96 ${coords} 100,96`;

  return (
    <div className="pt-4">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-[205px] w-full overflow-visible"
      >
        <defs>
          <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="0"
              stopColor="hsl(var(--primary))"
              stopOpacity=".22"
            />
            <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="26"
          x2="100"
          y2="26"
          stroke="hsl(var(--border))"
          strokeDasharray="1.5 2"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="0"
          y1="61"
          x2="100"
          y2="61"
          stroke="hsl(var(--border))"
          strokeDasharray="1.5 2"
          vectorEffect="non-scaling-stroke"
        />
        <polygon points={area} fill="url(#chart-fill)" />
        <polyline
          points={coords}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {points.map((p, i) => (
          <circle
            key={p.label + i}
            cx={(i / Math.max(points.length - 1, 1)) * 100}
            cy={96 - ((p.value - min) / range) * 70}
            r="1.8"
            fill="hsl(var(--card))"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="mt-3 flex justify-between font-mono-ui text-[9px] text-muted-foreground">
        {points.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}
