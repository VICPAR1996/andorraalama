import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-[14px] bg-surface-2 border border-line text-ink cursor-pointer transition-all active:scale-[0.95]",
          size === "sm" && "w-9 h-9",
          size === "md" && "w-11 h-11",
          size === "lg" && "w-14 h-14 rounded-[18px]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
export { IconButton };
