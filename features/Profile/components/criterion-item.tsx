import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { TypeReferenceCriterion } from '../types/TypeReferenceCriterion'

type CriterionItemProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
} & TypeReferenceCriterion

const CriterionItemVariants = cva(
  'CriterionItem flex items-center gap-2 text-sm text-gray-700',
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
  icon: Icon,
  label,
  value,
}: CriterionItemProps) {
  if (value !== 'yes') {
    return null
  }

  return (
    <div className={cn(CriterionItemVariants({ variant, className }))}>
      <span className="flex size-5 items-center justify-center rounded-full bg-green-50 text-green-600">
        <Icon className="size-3.5" />
      </span>

      <span>{label}</span>
    </div>
  )
}
