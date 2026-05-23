'use server'

import { ServiceCreateReference } from '@/services/ServiceCreateReference'
import { Reference } from '@/types/strapi-types'

export async function ActionSubmitValidateRental({
  paidOnTime,
  wellMaintained,
  communication,
  recommended,
  comment,
  rentalDocumentId,
}: {
  paidOnTime: Reference['paidOnTime']
  wellMaintained: Reference['wellMaintained']
  communication: Reference['communication']
  recommended: Reference['recommended']
  comment: Reference['comment']
  rentalDocumentId: Reference['rentalDocumentId']
}) {
  const { tenant } = await ServiceCreateReference({
    paidOnTime,
    wellMaintained,
    communication,
    recommended,
    comment,
    rentalDocumentId,
  })

  await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/send/tenant-notification`,
    {
      method: 'POST',
      body: JSON.stringify({
        email: tenant!.email,
        slug: tenant!.slug,
      }),
    },
  )
}
