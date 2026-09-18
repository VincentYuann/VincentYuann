import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent bg-clip-padding font-sans font-semibold text-xs tracking-wider uppercase whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Dark button in light mode, Light button in dark mode
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 border-primary shadow-2xs",
        // Transparent with strong tan / graphite border
        secondary:
          "border-[#BDAA89] dark:border-[#565A63] bg-transparent text-foreground hover:bg-muted/50",
        // Terracotta identity accent
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 border-accent shadow-2xs",
        // Neutral hairline outline
        outline:
          "border-border bg-transparent text-foreground hover:bg-card hover:border-[#BDAA89] dark:hover:border-[#565A63]",
        // Ghost / text-only
        ghost:
          "hover:bg-muted/60 text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/30",
        link:
          "text-accent underline-offset-4 hover:underline normal-case tracking-normal p-0 h-auto font-normal",
      },
      size: {
        default: "h-10 gap-2 px-4 text-xs",
        sm: "h-8 gap-1.5 px-3 text-[11px]",
        lg: "h-11 gap-2 px-5 text-sm",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-xs": "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
