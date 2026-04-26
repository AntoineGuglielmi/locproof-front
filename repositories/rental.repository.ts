import { strapiClient } from '@/lib/strapi'
import { Rental } from '@/types/strapi-types'

export const rentalRepository = {
  async create(data: {
    address: Rental['address']
    startDate: Rental['startDate']
    endDate: Rental['endDate']
    landlordEmail: Rental['landlordEmail']
    tenantDocumentId: Rental['tenantDocumentId']
    expiresAt: Rental['expiresAt']
    rentalToken: Rental['rentalToken']
  }) {
    const res = await strapiClient.collection('rentals').create(data)
    return res.data
  },
}
