import { cn } from "@/lib/cn";

interface ChipProps {
  children: React.ReactNode;
  live?: boolean;
  className?: string;
}

export function Chip({ children, live, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-mono border border-line text-ink-dim bg-surface",
        className
      )}
    >
      {live && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      )}
      {children}
    </span>
  );
}
