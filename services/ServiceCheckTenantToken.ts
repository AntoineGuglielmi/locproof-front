import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { TenantVerification } from '@/types/strapi-types'

export const ServiceCheckTenantToken = async ({
  tenantVerificationToken,
}: {
  tenantVerificationToken: string
}): Promise<{
  ok: boolean
  reason?: 'invalid' | 'expired'
  redirectTo: string
  email?: TenantVerification['email']
}> => {
  const tenantVerification =
    await tenantVerificationRepository.findTenantVerificationByToken(
      tenantVerificationToken,
    )

  if (!tenantVerification) {
    return {
      ok: false,
      reason: 'invalid',
      redirectTo: '/error/no-verification',
    }
  }

  const tenantVerificationIsExpired =
    new Date(tenantVerification.expiresAt!) < new Date()

  if (tenantVerificationIsExpired) {
    return {
      ok: false,
      reason: 'expired',
      redirectTo: '/error/verification-expired',
    }
  }

  if (tenantVerification.state === 'validated') {
    return {
      ok: false,
      reason: 'invalid',
      redirectTo: '/error/verification-no-longer-valid',
    }
  }

  return {
    ok: true,
    redirectTo: `/create/rental/${tenantVerificationToken}`,
    email: tenantVerification.email,
  }
}
