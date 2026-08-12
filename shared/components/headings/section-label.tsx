import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'

type SectionLabelProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const SectionLabelVariants = cva(
  'SectionLabel text-sm font-semibold uppercase tracking-wider text-indigo-600',
  {
    variants: {
      variant: {
        default: '',
        other: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export default function SectionLabel({
  className,
  variant,
  children,
}: SectionLabelProps) {
  return (
    <p className={cn(SectionLabelVariants({ variant, className }))}>
      {children}
    </p>
  )
}
