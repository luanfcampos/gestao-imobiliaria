import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        emerald: "border-transparent bg-[color:var(--color-success)_/20] text-[var(--color-success)]",
        blue: "border-transparent bg-[color:var(--color-info)_/20] text-[var(--color-info)]",
        amber: "border-transparent bg-[color:var(--color-alert)_/20] text-[var(--color-alert)]",
        zinc: "border-transparent bg-[color:var(--color-neutral)_/20] text-[var(--color-neutral)]",
        red: "border-transparent bg-[color:var(--color-error)_/20] text-[var(--color-error)]",
      },
    },
    defaultVariants: {
      variant: "zinc",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
