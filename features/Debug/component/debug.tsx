import { cn } from '@/lib/utils'
import { rentalRepository } from '@/repositories/rental.repository'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { tenantRepository } from '@/repositories/tenant.repository'
import List from '@/shared/components/list/List'
import { Rental, TenantVerification } from '@/types/strapi-types'
import { cva } from 'class-variance-authority'
import Link from 'next/link'

type DebugProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

type DebugSection<T> = {
  title: string
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T) => React.ReactNode
}

const DebugVariants = cva('Debug mx-4 p-4 bg-gray-200 rounded-md', {
  variants: {},
  defaultVariants: {},
})

export default async function Debug({ className }: DebugProps) {
  const tenantVerifications = await tenantVerificationRepository.all()
  const rentals = await rentalRepository.all()

  const pendingVerifications: DebugSection<TenantVerification> = {
    title: 'Demandes de vérification en attente',
    items: tenantVerifications.filter((tenver) => tenver.state === 'pending'),
    getKey: (item) => item.documentId!,
    renderItem: (tenver) => (
      <Link
        href={`${process.env.NEXT_PUBLIC_APP_URL}/create/rental/${tenver.tenantVerificationToken}`}
      >
        /create/rental/{tenver.tenantVerificationToken} by{' '}
        <span className="font-bold">{tenver.email}</span>
      </Link>
    ),
  }

  const pendingRentals: DebugSection<Rental> = {
    title: 'Location crées en attente de validation bailleur',
    items: rentals.filter((rental) => rental.state === 'pending'),
    getKey: (item) => item.documentId!,
    renderItem: async (rental) => {
      const tenant = await tenantRepository.findBydDocumentId(
        rental.tenantDocumentId,
      )
      return (
        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/validate/${rental.rentalToken}`}
        >
          /validate/{rental.rentalToken} by{' '}
          <span className="font-bold">{tenant?.email}</span>
        </Link>
      )
    },
  }

  const debug = [pendingVerifications, pendingRentals]

  return (
    <div className={cn(DebugVariants({ className }))}>
      <p className="font-bold text-lg">Debug</p>
      <List
        className="pl-4"
        items={debug}
        renderItem={({ title, items, renderItem, getKey }) => {
          return (
            <section>
              <p className="font-semibold">{title}</p>
              <List
                className="pl-4"
                items={items}
                getKey={getKey}
                renderItem={renderItem}
              />
            </section>
          )
        }}
        getKey={(item) => item.title}
      />
    </div>
  )
}
