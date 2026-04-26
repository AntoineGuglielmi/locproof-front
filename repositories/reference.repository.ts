import { strapiClient } from '@/lib/strapi'

export const referenceRepository = {
  async create(data) {
    const res = await strapiClient.collection('references').create({
      data,
    })

    // 🔥 normalisation (important)
    return {
      id: res.data.id,
      ...res.data.attributes,
    }
  },
}
