import { strapiClient } from '@/lib/strapi'

export const rentalRepository = {
  async create(data) {
    return await strapiClient.create('rentals', {
      data,
    })
  },
}
