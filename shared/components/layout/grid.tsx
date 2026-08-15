import type { HTMLAttributes } from 'react'

import { cn } from '@/shared/lib/className'

type GridProps = HTMLAttributes<HTMLDivElement>

export function Grid({ className, ...props }: GridProps) {
  return (
    <div
      className={cn('Grid grid-container', className)}
      {...props}
    />
  )
}
