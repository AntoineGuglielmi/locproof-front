import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'

type CriterionItemProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
  criterion: string
  index: number
}

const CriterionItemVariants = cva(
  'CriterionItem flex items-center gap-3 rounded-xl border bg-gray-50 px-5 py-4',
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

export default function CriterionItem({
  className,
  variant,
  criterion,
  index,
}: CriterionItemProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={cn(CriterionItemVariants({ variant, className }))}
    >
      <span
        aria-hidden="true"
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700"
      >
        ✓
      </span>

      <span className="text-sm font-medium text-gray-700">{criterion}</span>
    </MotionDiv>
  )
}
