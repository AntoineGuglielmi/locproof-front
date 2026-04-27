import { Reference, Rental } from '@/types/strapi-types'

export const mergeReferenceRental = ({
  reference,
  rental,
}: {
  reference: Reference
  rental: Rental
}): {
  id: string
  documentId: Rental['documentId']
  address: Rental['address']
  startDate: Rental['startDate']
  endDate: Rental['endDate']
  paidOnTime: Reference['paidOnTime']
  wellMaintained: Reference['wellMaintained']
  communication: Reference['communication']
  recommended: Reference['recommended']
  comment: Reference['comment']
} => {
  return {
    id: `${rental.id}-${reference.id}`,
    documentId: `${rental.documentId}-${reference.documentId}`,
    address: rental.address,
    startDate: rental.startDate,
    endDate: rental.endDate,
    paidOnTime: reference.paidOnTime,
    wellMaintained: reference.wellMaintained,
    communication: reference.communication,
    recommended: reference.recommended,
    comment: reference.comment,
  }
}
