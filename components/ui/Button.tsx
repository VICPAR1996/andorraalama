import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "sos";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "secondary", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-[18px] py-3 text-[14px] font-medium leading-none transition-all active:scale-[0.97]",
          "min-h-[44px] cursor-pointer",
          variant === "primary" && [
            "bg-accent text-[#0a0a0b] border-transparent",
            "shadow-[0_8px_30px_-10px_oklch(72%_0.16_245_/_0.6)]",
          ],
          variant === "secondary" && "bg-surface-2 border border-line-strong text-ink",
          variant === "ghost" && "bg-transparent border border-line-strong text-ink",
          variant === "destructive" && [
            "bg-danger text-white border-transparent",
            "shadow-[0_8px_30px_-10px_oklch(70%_0.18_25_/_0.6)]",
          ],
          variant === "sos" && [
            "bg-danger text-white border-transparent w-14 h-14 rounded-[18px] text-xs font-semibold",
            "shadow-[0_8px_30px_-10px_oklch(70%_0.18_25_/_0.6)]",
          ],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
