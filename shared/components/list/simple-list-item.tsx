import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import TextBody from '@/shared/components/text/text-body'

type SimpleListItemProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
  body: string
}

const SimpleListItemVariants = cva('', {
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

export default function SimpleListItem({
  className,
  variant,
  body,
}: SimpleListItemProps) {
  return (
    <TextBody className={cn(SimpleListItemVariants({ variant, className }))}>
      - {body}
    </TextBody>
  )
}
