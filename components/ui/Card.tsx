import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: "left" | "right" | "none";
}

export function Card({ children, className, tilt = "none" }: CardProps) {
  return (
    <div
      className={cn(
        "bg-paper-2 border-2 border-ink rounded-[22px] p-5",
        "shadow-[6px_6px_0_#2a1f17]",
        tilt === "left" && "rotate-[-1deg]",
        tilt === "right" && "rotate-[1deg]",
        className
      )}
    >
      {children}
    </div>
  );
}
