import type { HTMLAttributes } from 'react'

import { cn } from '@/shared/lib/className'

type GridProps = HTMLAttributes<HTMLDivElement>

export function Grid({ className, ...props }: GridProps) {
  return (
    <div
      className={cn('content-grid', className)}
      {...props}
    />
  )
}

export function Narrow({ className, ...props }: GridProps) {
  return (
    <div
      className={cn('narrow', className)}
      {...props}
    />
  )
}

export function Breakout({ className, ...props }: GridProps) {
  return (
    <div
      className={cn('breakout', className)}
      {...props}
    />
  )
}

export function Feature({ className, ...props }: GridProps) {
  return (
    <div
      className={cn('feature', className)}
      {...props}
    />
  )
}

export function FullWidth({ className, ...props }: GridProps) {
  return (
    <div
      className={cn('full-width', className)}
      {...props}
    />
  )
}
