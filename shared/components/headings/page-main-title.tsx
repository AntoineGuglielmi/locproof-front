import { cn } from '@/shared/lib/className'
import { cva } from 'class-variance-authority'

type PageMainTitleProps = {
  className?: string
  version?: 'big' | 'small'
  children?: React.ReactNode
}

const PageMainTitleVariants = cva(
  'PageMainTitle font-bold tracking-tight text-balance',
  {
    variants: {
      version: {
        big: 'text-5xl md:text-6xl mb-6',
        small: 'text-3xl md:text-4xl mb-4',
      },
    },
    defaultVariants: {
      version: 'big',
    },
  },
)

export default function PageMainTitle({
  className,
  version,
  children,
}: PageMainTitleProps) {
  return (
    <h1 className={cn(PageMainTitleVariants({ version, className }))}>
      {children}
    </h1>
  )
}
