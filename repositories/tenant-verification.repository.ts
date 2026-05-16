import { strapiClient } from '@/lib/strapi'
import { TenantVerification } from '@/types/strapi-types'

const COLLECTION_NAME = 'tenant-verifications'

export const tenantVerificationRepository = {
  async create({
    email,
    expiresAt,
    tenantVerificationToken,
  }: {
    email: TenantVerification['email']
    tenantVerificationToken: TenantVerification['tenantVerificationToken']
    expiresAt: TenantVerification['expiresAt']
  }) {
    await strapiClient.collection(COLLECTION_NAME).create({
      email,
      tenantVerificationToken,
      expiresAt,
    })
  },

  async findTenantVerificationByToken(
    tenantVerificationToken: TenantVerification['tenantVerificationToken'],
  ): Promise<TenantVerification | null> {
    const res = await strapiClient.collection(COLLECTION_NAME).find({
      filters: {
        tenantVerificationToken: {
          $eq: tenantVerificationToken,
        },
      },
    })

    return res.data.length > 0 ? res.data[0] : null
  },

  async markAsValidated(
    tenantVerificationId: TenantVerification['documentId'],
  ) {
    await strapiClient
      .collection(COLLECTION_NAME)
      .update(tenantVerificationId!, {
        state: 'validated',
      })
  },

  async all(): Promise<Array<TenantVerification>> {
    return (await strapiClient.collection(COLLECTION_NAME).find()).data
  },
}
