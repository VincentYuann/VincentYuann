import * as React from "react"
import { cn } from "cn"

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
  withDiamond?: boolean
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      withDiamond = false,
      ...props
    },
    ref
  ) => {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn("w-[1px] bg-border self-stretch", className)}
          {...props}
        />
      )
    }

    if (withDiamond) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn("relative flex items-center justify-center w-full my-6", className)}
          {...props}
        >
          <div className="w-full h-[1px] bg-border" />
          <div className="absolute px-2 bg-background">
            <div className="size-1.5 rotate-45 border border-border bg-[#BDAA89]/30 dark:bg-[#565A63]/40" />
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn("h-[1px] w-full bg-border", className)}
        {...props}
      />
    )
  }
)
Separator.displayName = "Separator"

export { Separator }
