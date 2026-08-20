import { formatDateForStrapi } from '@/shared/lib/date'
import { strapiClient } from '@/shared/lib/strapi'
import { Rental, Tenant } from '@/shared/types/strapi-types'

const COLLECTION_NAME = 'rentals'

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
  }): Promise<Rental> {
    const res = await strapiClient.collection(COLLECTION_NAME).create({
      ...data,
      startDate: formatDateForStrapi(data.startDate!),
      endDate: formatDateForStrapi(data.endDate!),
    })
    return res.data
  },

  async findByRentalToken(
    rentalToken: Rental['rentalToken'],
  ): Promise<Rental | null> {
    const res = await strapiClient.collection(COLLECTION_NAME).find({
      filters: {
        rentalToken: {
          $eq: rentalToken,
        },
      },
    })
    return res.data.length > 0 ? res.data[0] : null
  },

  async markAsValidated(rentalDocumentId: Rental['documentId']) {
    await strapiClient.collection(COLLECTION_NAME).update(rentalDocumentId!, {
      state: 'validated',
      validatedAt: new Date(),
    })
  },

  async findByDocumentId(
    documentId: Rental['documentId'],
  ): Promise<Rental | null> {
    const res = await strapiClient.collection(COLLECTION_NAME).find({
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
    const res = await strapiClient.collection(COLLECTION_NAME).find({
      filters: {
        tenantDocumentId: {
          $eq: tenantDocumentId,
        },
      },
    })
    return res.data || []
  },

  async all(): Promise<Array<Rental>> {
    return (await strapiClient.collection(COLLECTION_NAME).find()).data
  },

  async findOverlappingRental(data: {
    tenantDocumentId: Tenant['documentId']
    startDate: Rental['startDate']
    endDate: Rental['endDate']
  }): Promise<Rental | null> {
    const res = await strapiClient.collection(COLLECTION_NAME).find({
      filters: {
        tenantDocumentId: {
          $eq: data.tenantDocumentId,
        },
        startDate: {
          $lte: formatDateForStrapi(data.endDate!),
        },
        endDate: {
          $gte: formatDateForStrapi(data.startDate!),
        },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
    })

    return res.data[0] ?? null
  },
}
