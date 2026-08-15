'use client'

import { AnimatePresence } from 'framer-motion'

import { FieldError } from '@/shared/components/shadcn/ui/field'
import MotionDiv from '@/shared/components/layout/motion-div'
import { cn } from '@/shared/lib/className'

type AnimatedFieldErrorProps = {
  className?: string
  error?: {
    message?: string
  }
}

export default function AnimatedFieldError({
  error,
  className,
}: AnimatedFieldErrorProps) {
  return (
    <AnimatePresence initial={false}>
      {error?.message && (
        <MotionDiv
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
        >
          <FieldError
            className={cn('text-left text-[0.65rem]', className)}
            errors={[error]}
          />
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}
