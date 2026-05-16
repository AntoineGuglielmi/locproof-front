import { cn } from '@/lib/utils'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { cva } from 'class-variance-authority'

type DebugProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const DebugVariants = cva('Debug', {
  variants: {},
  defaultVariants: {},
})

export default async function Debug({ className }: DebugProps) {
  const tenantVerifications = await tenantVerificationRepository.all()
  return <div className={cn(DebugVariants({ className }))}>Debug</div>
}
