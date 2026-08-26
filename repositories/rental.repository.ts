import { formatDateForStrapi } from '@/shared/lib/date'
import { strapiClient } from '@/shared/lib/strapi'
import { Rental, Tenant, TenantVerification } from '@/shared/types/strapi-types'

const COLLECTION_NAME = 'rentals'

export const rentalRepository = {
  async create(data: {
    address: Rental['address']
    startDate: Rental['startDate']
    endDate: Rental['endDate']
    landlordEmail: Rental['landlordEmail']
    expiresAt: Rental['expiresAt']
    rentalToken: Rental['rentalToken']
    cityPublic: Rental['cityPublic']
    tenant: Tenant
    tenantVerification: TenantVerification
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
      populate: {
        tenant: true,
      },
    })
    return res.data.length > 0 ? res.data[0] : null
  },

  async findByTenantVerificationToken(
    tenantVerificationToken: TenantVerification['tenantVerificationToken'],
  ): Promise<Rental | null> {
    const res = await strapiClient.collection(COLLECTION_NAME).find({
      filters: {
        tenantVerification: {
          tenantVerificationToken: {
            $eq: tenantVerificationToken,
          },
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
        tenant: {
          tenantDocumentId: {
            $eq: tenantDocumentId,
          },
        },
      },
    })
    return res.data || []
  },

  async all(): Promise<Array<Rental>> {
    return (await strapiClient.collection(COLLECTION_NAME).find()).data
  },

  async findOverlappingRental(data: {
    tenant: Tenant
    startDate: Rental['startDate']
    endDate: Rental['endDate']
  }): Promise<Rental | null> {
    const res = await strapiClient.collection(COLLECTION_NAME).find({
      filters: {
        tenant: {
          documentId: {
            $eq: data.tenant.documentId,
          },
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
