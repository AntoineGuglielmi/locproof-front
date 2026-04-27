import { referenceRepository } from '@/repositories/reference.repository'
import { rentalRepository } from '@/repositories/rental.repository'
import { Reference } from '@/types/strapi-types'

export const ServiceCreateReference = async ({
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
}) => {
  await referenceRepository.create({
    paidOnTime,
    wellMaintained,
    communication,
    recommended,
    comment,
    rentalDocumentId,
  })

  await rentalRepository.markAsValidated(rentalDocumentId)
}
