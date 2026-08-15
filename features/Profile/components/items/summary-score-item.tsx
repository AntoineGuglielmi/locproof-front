import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { TypeScore } from '@/features/Profile/types/TypeScore'
import MotionDiv from '@/shared/components/layout/motion-div'
import { percentage } from '@/lib/string'
import { TypeSynthesis } from '@/shared/types/profile-synthesis'

type SummaryScoreItemProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
  index: number
  referencesCount: TypeSynthesis['referencesCount']
} & TypeScore

const SummaryScoreItemVariants = cva(
  'SummaryScoreItem rounded-2xl border bg-white p-5 flex flex-col h-full',
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

export default function SummaryScoreItem({
  className,
  variant,
  icon: Icon,
  label,
  value,
  index,
  referencesCount,
}: SummaryScoreItemProps) {
  return (
    <MotionDiv
      key={label}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.05 }}
      className={cn(SummaryScoreItemVariants({ variant, className }))}
    >
      <Icon className="size-5 text-indigo-600" />

      <p className="mt-4 text-sm text-gray-500">{label}</p>

      <p className="mt-auto text-xl font-semibold text-gray-950">
        {percentage(value)}
      </p>

      <p className="text-xs text-gray-400">
        {referencesCount} {referencesCount > 1 ? 'références' : 'référence'}
      </p>
    </MotionDiv>
  )
}
