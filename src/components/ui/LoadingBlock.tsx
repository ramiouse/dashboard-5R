export function LoadingBlock({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-lg bg-muted ${className}`} />;
}
