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
  }) {
    await strapiClient.collection('references').create(data)
  },

  async findByRentalDocumentId(
    rentalDocumentId: Rental['documentId'],
  ): Promise<Reference | null> {
    const res = await strapiClient.collection('references').find({
      filters: {
        rental: {
          documentId: {
            $eq: rentalDocumentId,
          },
        },
      },
    })
    return res.data.length > 0 ? res.data[0] : null
  },

  async findByTenant(
    tenantDocumentId: Tenant['documentId'],
  ): Promise<Reference[]> {
    const res = await strapiClient.collection('references').find({
      filters: {
        rental: {
          tenant: {
            documentId: {
              $eq: tenantDocumentId,
            },
          },
        },
      },
      populate: {
        rental: {
          fields: ['address', 'startDate', 'endDate', 'cityPublic'],
        },
      },
      fields: [
        'documentId',
        'comment',
        'paidOnTime',
        'wellMaintained',
        'communication',
        'recommended',
      ],
      sort: ['rental.startDate:desc'],
    })

    return res.data
  },
}
