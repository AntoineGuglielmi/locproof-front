import { strapiClient } from '@/lib/strapi'
import { Reference, Rental } from '@/types/strapi-types'

export const referenceRepository = {
  async create({
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
    await strapiClient.collection('references').create({
      paidOnTime,
      wellMaintained,
      communication,
      recommended,
      comment,
      rentalDocumentId,
    })
  },

  async findByRentalToken(rentalDocumentId: Rental['documentId']) {
    const res = await strapiClient.collection('references').find({
      filters: {
        rentalDocumentId: {
          $eq: rentalDocumentId,
        },
      },
    })
    return res.data.length > 0 ? res.data[0] : null
  },
}
