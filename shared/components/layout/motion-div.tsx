'use client'

import { cn } from '@/shared/lib/className'
import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes, forwardRef } from 'react'

type MotionDivProps = MotionProps & HTMLAttributes<HTMLDivElement>

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(function MotionDiv(
  { transition, className, ...props },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
        ...transition,
      }}
      className={cn('MotionDiv', className)}
      {...props}
    />
  )
})

export default MotionDiv
