import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "sos";
  parishColor?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "secondary", parishColor, className, children, style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-3 text-[15px] font-bold border-2 border-ink cursor-pointer transition-transform active:translate-x-[2px] active:translate-y-[2px]",
          "min-h-[44px]",
          variant === "primary" && "bg-enko text-paper shadow-[4px_4px_0_#2a1f17] active:shadow-none",
          variant === "secondary" && "bg-paper-2 text-ink shadow-[4px_4px_0_#2a1f17] active:shadow-none",
          variant === "ghost" && "bg-transparent text-ink",
          variant === "sos" && "bg-dino text-paper shadow-[4px_4px_0_#2a1f17] active:shadow-none",
          className
        )}
        style={parishColor ? { background: parishColor, ...style } : style}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
