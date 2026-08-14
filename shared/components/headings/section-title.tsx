import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'

type SectionTitleProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const SectionTitleVariants = cva(
  'SectionTitle mt-3 mb-7 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900',
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

export default function SectionTitle({
  className,
  variant,
  children,
}: SectionTitleProps) {
  return (
    <h2 className={cn(SectionTitleVariants({ variant, className }))}>
      {children}
    </h2>
  )
}
