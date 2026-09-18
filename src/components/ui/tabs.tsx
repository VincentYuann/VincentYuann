import * as React from "react"
import { Tabs as RadixTabs } from "radix-ui"
import { cn } from "cn"

const Tabs = RadixTabs.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.List>
>(({ className, ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 p-1 bg-card border border-border rounded-sm text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = RadixTabs.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 rounded-sm text-[11px] font-sans font-semibold uppercase tracking-wider transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-2xs cursor-pointer",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = RadixTabs.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={cn(
      "mt-3 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = RadixTabs.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
