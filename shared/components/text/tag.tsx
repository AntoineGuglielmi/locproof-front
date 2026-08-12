import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { LucideProps } from 'lucide-react'

type TagProps = {
  className?: string
  size?: 'default' | 'small'
  type?: 'success' | 'info'
  children?: React.ReactNode
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}

const TagVariants = cva(
  'Tag inline-flex items-center rounded-full font-medium',
  {
    variants: {
      size: {
        default: 'gap-2 px-4 py-2 text-sm',
        small: 'gap-1 px-2.5 py-1 text-xs',
      },
      type: {
        success: 'bg-green-50 text-green-700',
        info: 'bg-indigo-50 text-indigo-700',
      },
    },
    defaultVariants: {
      size: 'default',
      type: 'info',
    },
  },
)

export default function Tag({
  className,
  size,
  type,
  children,
  Icon,
}: TagProps) {
  return (
    <span className={cn(TagVariants({ size, type, className }))}>
      {Icon ? (
        <Icon size={14} />
      ) : (
        <span
          aria-hidden="true"
          className="size-2 rounded-full bg-indigo-500"
        />
      )}
      {children}
    </span>
  )
}
