import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size    = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?:    Size;
}

type ButtonProps =
  | (BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90",
  secondary:
    "bg-card border border-border text-foreground-secondary hover:border-gold/35 hover:text-foreground hover:bg-card/80",
  ghost:
    "text-foreground-secondary hover:text-foreground hover:bg-white/[0.04]",
  outline:
    "border border-border text-foreground-secondary hover:border-gold/40 hover:text-foreground",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8  px-3   text-xs  gap-1.5",
  md: "h-10 px-4.5 text-sm  gap-2",
  lg: "h-11 px-6   text-sm  gap-2",
};

export function Button({
  children,
  variant  = "primary",
  size     = "md",
  className,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg font-body font-medium",
    "transition-all duration-200",
    "active:scale-[0.97]",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-gold/50 focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
