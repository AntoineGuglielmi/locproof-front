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

  async findByTenant(
    tenantDocumentId: Tenant['documentId'],
  ): Promise<Array<Reference>> {
    const res = await strapiClient.collection('references').find({
      filters: {
        tenant: {
          documentId: {
            $eq: tenantDocumentId,
          },
        },
      },
      populate: {
        rental: {
          fields: ['address', 'startDate', 'endDate', 'cityPublic'],
        },
      },
      fields: [
        'comment',
        'paidOnTime',
        'wellMaintained',
        'communication',
        'recommended',
      ],
    })

    return res.data.sort((a, b) => {
      return (
        new Date(b.rental?.startDate ?? 0).getTime() -
        new Date(a.rental?.startDate ?? 0).getTime()
      )
    })
  },
}
