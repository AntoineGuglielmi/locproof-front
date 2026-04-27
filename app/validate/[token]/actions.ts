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
  await ServiceCreateReference({
    paidOnTime,
    wellMaintained,
    communication,
    recommended,
    comment,
    rentalDocumentId,
  })
}
