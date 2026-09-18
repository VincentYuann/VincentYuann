import * as React from "react"
import { cn } from "cn"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "large" | "narrow" | "stacked" | "double"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "standard", ...props }, ref) => {
    const variantStyles = {
      standard: "rounded-lg border border-border bg-card text-card-foreground shadow-none",
      large: "rounded-lg border border-border bg-card text-card-foreground p-2 sm:p-4 shadow-none",
      narrow: "rounded-lg border border-border bg-card text-card-foreground shadow-none",
      stacked: "card-stack rounded-lg border border-border bg-card text-card-foreground shadow-none",
      double: "frame-double rounded-lg bg-card text-card-foreground shadow-none",
    }

    return (
      <div
        ref={ref}
        className={cn(variantStyles[variant], "transition-colors", className)}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-5 sm:p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-serif text-xl font-normal leading-tight tracking-tight text-foreground",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground font-sans leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 sm:p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-5 sm:p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
