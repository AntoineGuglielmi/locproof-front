import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import List from '@/shared/components/list/List'
import SimpleListItem from './simple-list-item'

type TextBodyListProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
  items: Array<{ body: string }>
}

const TextBodyListVariants = cva('TextBodyList flex flex-col gap-3 pl-4', {
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

export default function TextBodyList({
  className,
  variant,
  items,
}: TextBodyListProps) {
  return (
    <List
      items={items}
      renderItem={SimpleListItem}
      getKey={(_, index) => index}
      className={cn(TextBodyListVariants({ variant, className }))}
    />
  )
}
