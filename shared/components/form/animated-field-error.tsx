'use client'

import { AnimatePresence } from 'framer-motion'

import { FieldError } from '@/shared/components/shadcn/ui/field'
import MotionDiv from '@/shared/components/layout/motion-div'

type AnimatedFieldErrorProps = {
  error?: {
    message?: string
  }
}

export default function AnimatedFieldError({ error }: AnimatedFieldErrorProps) {
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
            className="bg-red-50 py-4 border border-red-200 rounded-lg text-center"
            errors={[error]}
          />
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}
