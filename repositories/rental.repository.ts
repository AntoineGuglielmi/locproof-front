import { strapiClient } from '@/lib/strapi'
import { Rental, Tenant } from '@/types/strapi-types'

export const rentalRepository = {
  async create(data: {
    address: Rental['address']
    startDate: Rental['startDate']
    endDate: Rental['endDate']
    landlordEmail: Rental['landlordEmail']
    tenantDocumentId: Rental['tenantDocumentId']
    expiresAt: Rental['expiresAt']
    rentalToken: Rental['rentalToken']
    cityPublic: Rental['cityPublic']
  }) {
    const res = await strapiClient.collection('rentals').create(data)
    return res.data
  },

  async findByRentalToken(
    rentalToken: Rental['rentalToken'],
  ): Promise<Rental | null> {
    const res = await strapiClient.collection('rentals').find({
      filters: {
        rentalToken: {
          $eq: rentalToken,
        },
      },
    })
    return res.data.length > 0 ? res.data[0] : null
  },

  async markAsValidated(rentalDocumentId: Rental['documentId']) {
    await strapiClient.collection('rentals').update(rentalDocumentId!, {
      state: 'validated',
      validatedAt: new Date(),
    })
  },

  async findByDocumentId(
    documentId: Rental['documentId'],
  ): Promise<Rental | null> {
    const res = await strapiClient.collection('rentals').find({
      filters: {
        documentId: {
          $eq: documentId,
        },
      },
    })
    return res.data[0] || null
  },

  async findByTenantDocumentId(
    tenantDocumentId: Tenant['documentId'],
  ): Promise<Rental[]> {
    const res = await strapiClient.collection('rentals').find({
      filters: {
        tenantDocumentId: {
          $eq: tenantDocumentId,
        },
      },
    })
    return res.data || []
  },
}
