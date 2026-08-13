import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import MotionDiv from '@/shared/components/layout/motion-div'
import { TypeHowItWorksStep } from '../types/TypeHowItWorksStep'

type HowItWorksItemProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
  index: number
} & TypeHowItWorksStep

const HowItWorksItemVariants = cva('HowItWorksItem', {
  variants: {
    variant: {
      default: '',
      other: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export default function HowItWorksItem({
  className,
  variant,
  description,
  number,
  title,
  index,
}: HowItWorksItemProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn(HowItWorksItemVariants({ variant, className }))}
    >
      <div className="text-5xl font-semibold tracking-tight text-indigo-100">
        {number}
      </div>

      <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>

      <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>
    </MotionDiv>
  )
}
