import { strapiClient } from '@/shared/lib/strapi'
import { Reference, Rental, Tenant } from '@/shared/types/strapi-types'

export const referenceRepository = {
  async create(data: {
    paidOnTime: Reference['paidOnTime']
    wellMaintained: Reference['wellMaintained']
    communication: Reference['communication']
    recommended: Reference['recommended']
    comment: Reference['comment']
    rental: Rental
    tenant: Tenant
  }) {
    await strapiClient.collection('references').create(data)
  },

  async findByRentalDocumentId(rentalDocumentId: Rental['documentId']) {
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
