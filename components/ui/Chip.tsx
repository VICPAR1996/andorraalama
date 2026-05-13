import { cn } from "@/lib/cn";

interface ChipProps {
  children: React.ReactNode;
  live?: boolean;
  variant?: "default" | "green" | "orange";
  className?: string;
}

export function Chip({ children, live, variant = "default", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wide uppercase",
        "border-2 border-ink shadow-[2px_2px_0_#2a1f17]",
        variant === "default" && "bg-paper-2 text-ink",
        variant === "green" && "bg-enko text-paper",
        variant === "orange" && "bg-andy text-paper",
        className
      )}
    >
      {live && <span className="w-1.5 h-1.5 rounded-full bg-enko border border-ink" />}
      {children}
    </span>
  );
}
