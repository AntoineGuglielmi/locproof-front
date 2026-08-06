import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'

type TextBodyProps = {
  className?: string
  variant?: 'default'
  children?: React.ReactNode
}

const BodyVariants = cva('TextBody text-gray-500 leading-relaxed', {
  variants: {
    variant: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export default function TextBody({
  className,
  variant,
  children,
}: TextBodyProps) {
  return <p className={cn(BodyVariants({ variant, className }))}>{children}</p>
}
