'use client'

import { motion, MotionProps } from 'framer-motion'
import { HTMLAttributes, forwardRef } from 'react'

type MotionDivProps = MotionProps & HTMLAttributes<HTMLDivElement>

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  function MotionDiv(props, ref) {
    return (
      <motion.div
        ref={ref}
        {...props}
      />
    )
  },
)

export default MotionDiv
