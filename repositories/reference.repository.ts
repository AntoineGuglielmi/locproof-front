import { strapiClient } from '@/lib/strapi'

export const referenceRepository = {
  async create(data) {
    return await strapiClient.create('references', {
      data,
    })
  },
}
