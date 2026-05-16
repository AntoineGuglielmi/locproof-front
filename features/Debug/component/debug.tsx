import { cn } from '@/lib/utils'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import List from '@/shared/components/list/List'
import { TenantVerification } from '@/types/strapi-types'
import { cva } from 'class-variance-authority'
import Link from 'next/link'

type DebugProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const DebugVariants = cva('Debug mx-4 p-4 bg-gray-200 rounded-md', {
  variants: {},
  defaultVariants: {},
})

export default async function Debug({ className }: DebugProps) {
  const tenantVerifications = await tenantVerificationRepository.all()
  const debug: Array<{ title: string; items: Array<unknown> }> = [
    {
      title: 'Demandes de vérification en attente',
      items: tenantVerifications.filter((tenver) => tenver.state === 'pending'),
    },
  ]
  return (
    <div className={cn(DebugVariants({ className }))}>
      <p className="font-bold text-lg">Debug</p>
      <List
        className="pl-4"
        items={debug}
        renderItem={({ title, items }) => {
          return (
            <section>
              <p className="font-semibold">{title}</p>
              <List
                className="pl-4"
                items={items as Array<TenantVerification>}
                getKey={(item) => item.documentId!}
                renderItem={(tenver) => {
                  return (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_APP_URL}/create/rental/${tenver.tenantVerificationToken}`}
                    >
                      /create/rental/
                      {tenver.tenantVerificationToken} by{' '}
                      <span className="font-bold">{tenver.email}</span>
                    </Link>
                  )
                }}
              />
            </section>
          )
        }}
        getKey={(item) => item.title}
      />
    </div>
  )
}
