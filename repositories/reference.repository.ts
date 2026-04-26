import { strapiClient } from '@/lib/strapi'
import { Reference, Rental } from '@/types/strapi-types'

export const referenceRepository = {
  async create(data: Reference) {
    const res = await strapiClient.collection('references').create({
      data,
    })
    return {
      id: res.data.id,
      ...res.data.attributes,
    }
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
