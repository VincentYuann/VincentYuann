import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent font-sans font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground",
        tag:
          "border-border bg-transparent text-muted-foreground hover:border-[#BDAA89] dark:hover:border-[#565A63] text-[10px] tracking-wider uppercase font-semibold px-2.5 py-0.5",
        status:
          "border-border bg-card text-foreground text-xs px-3 py-1 font-medium shadow-2xs",
        accent:
          "border-accent/30 bg-accent/10 text-accent text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5",
        outline:
          "border-border text-foreground bg-transparent px-2.5 py-0.5 text-xs",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/20 text-xs px-2.5 py-0.5",
      },
    },
    defaultVariants: {
      variant: "tag",
    },
  }
)

function Badge({
  className,
  variant = "tag",
  asChild = false,
  dotColor,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    dotColor?: string
  }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {variant === "status" && (
        <span
          className="inline-block size-1.5 rounded-full shrink-0"
          style={{ backgroundColor: dotColor || "var(--color-accent)" }}
        />
      )}
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }
