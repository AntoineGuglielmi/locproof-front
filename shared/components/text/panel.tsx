import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { LucideProps } from 'lucide-react'

type PanelProps = {
  className?: string
  type?: 'info' | 'warning' | 'neutral'
  children?: React.ReactNode
  title: string
  body: string | React.ReactNode
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}

const PanelVariants = cva('Panel text-left rounded-2xl border p-6', {
  variants: {
    type: {
      info: 'bg-indigo-50 border-indigo-200 ',
      warning: 'border-amber-200 bg-amber-50',
      neutral: 'border-gray-200 bg-gray-50',
    },
  },
  defaultVariants: {
    type: 'info',
  },
})

const PanelTitleVariants = cva('Panel__title text-sm font-semibold', {
  variants: {
    type: {
      info: 'text-indigo-900',
      warning: 'text-amber-900',
      neutral: 'text-gray-900',
    },
  },
  defaultVariants: {
    type: 'info',
  },
})

const PanelBodyVariants = cva('Panel__body text-sm leading-relaxed', {
  variants: {
    type: {
      info: 'text-indigo-800',
      warning: 'text-amber-800',
      neutral: 'text-gray-800',
    },
  },
  defaultVariants: {
    type: 'info',
  },
})

const PanelIconVariants = cva('Panel__icon mt-0.5 size-5 shrink-0', {
  variants: {
    type: {
      info: 'text-indigo-600',
      warning: 'text-amber-600',
      neutral: 'text-gray-600',
    },
  },
  defaultVariants: {
    type: 'info',
  },
})

export default function Panel({
  className,
  type,
  body,
  title,
  Icon,
}: PanelProps) {
  return (
    <div className={cn(PanelVariants({ type, className }))}>
      <div className="flex gap-3">
        {Icon && (
          <Icon className={cn(PanelIconVariants({ type, className }))} />
        )}

        <div className="flex flex-col gap-2">
          <p className={cn(PanelTitleVariants({ type }))}>{title}</p>
          <p className={cn(PanelBodyVariants({ type }))}>{body}</p>
        </div>
      </div>
    </div>
  )
}
