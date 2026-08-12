import type { HTMLAttributes } from 'react'

import { cn } from '@/shared/lib/className'

type GridProps = HTMLAttributes<HTMLDivElement>

export function Grid({ className, ...props }: GridProps) {
  return (
    <div
      className={cn('Grid', className)}
      {...props}
    />
  )
}

export function Narrow({ className, ...props }: GridProps) {
  return (
    <div
      className={cn('Narrow', className)}
      {...props}
    />
  )
}

export function Breakout({ className, ...props }: GridProps) {
  return (
    <div
      className={cn('Breakout', className)}
      {...props}
    />
  )
}

export function Feature({ className, ...props }: GridProps) {
  return (
    <div
      className={cn('Feature', className)}
      {...props}
    />
  )
}

export function FullWidth({ className, ...props }: GridProps) {
  return (
    <div
      className={cn('FullWidth', className)}
      {...props}
    />
  )
}
