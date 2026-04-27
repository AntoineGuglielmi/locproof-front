import { strapiClient } from '@/lib/strapi'
import { TenantVerification } from '@/types/strapi-types'

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
    await strapiClient.collection('tenant-verifications').create({
      email,
      tenantVerificationToken,
      expiresAt,
    })
  },

  async findTenantVerificationByToken(
    tenantVerificationToken: TenantVerification['tenantVerificationToken'],
  ): Promise<TenantVerification | null> {
    const res = await strapiClient.collection('tenant-verifications').find({
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
      .collection('tenant-verifications')
      .update(tenantVerificationId!, {
        state: 'validated',
      })
  },
}
