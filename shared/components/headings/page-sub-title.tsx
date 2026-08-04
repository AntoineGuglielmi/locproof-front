import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'

type PageSubTitleProps = {
  className?: string
  version?: 'default'
  children?: React.ReactNode
}

const PageSubTitleVariants = cva('PageSubTitle text-xl text-gray-700 mb-4', {
  variants: {
    version: {
      default: '',
    },
  },
  defaultVariants: {
    version: 'default',
  },
})

export default function PageSubTitle({
  className,
  version,
  children,
}: PageSubTitleProps) {
  return (
    <p className={cn(PageSubTitleVariants({ version, className }))}>
      {children}
    </p>
  )
}
