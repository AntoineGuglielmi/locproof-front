'use client'

import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes, forwardRef } from 'react'

type MotionDivProps = MotionProps & HTMLAttributes<HTMLDivElement>

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(function MotionDiv(
  { transition, ...props },
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
      {...props}
    />
  )
})

export default MotionDiv
