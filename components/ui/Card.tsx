import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-line rounded-[14px] p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
