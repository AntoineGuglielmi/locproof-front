import { Reference } from '@/types/strapi-types'

export type TypeInputCreateReference = {
  paidOnTime: Reference['paidOnTime']
  wellMaintained: Reference['wellMaintained']
  communication: Reference['communication']
  recommended: Reference['recommended']
  comment: Reference['comment']
  rentalDocumentId: Reference['rentalDocumentId']
}
