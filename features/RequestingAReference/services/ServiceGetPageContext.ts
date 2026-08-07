import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { tenantRepository } from '@/repositories/tenant.repository'
import { EntityTenantVerification } from '@/shared/entities/EntityTenantVerification'
import { TenantVerification } from '@/shared/types/strapi-types'
import { TypeServiceGetPageContextReturn } from '../types/TypeServiceGetPageContextReturn'

export async function ServiceGetPageContext(
  tenantVerificationToken: TenantVerification['tenantVerificationToken'],
): Promise<TypeServiceGetPageContextReturn> {
  const tenantVerification =
    await tenantVerificationRepository.findTenantVerificationByToken(
      tenantVerificationToken,
    )

  if (!tenantVerification) {
    return {
      status: 'not-found',
    }
  }

  const tenantVerificationEntity = new EntityTenantVerification(
    tenantVerification,
  )

  if (tenantVerificationEntity.isExpired()) {
    return {
      status: 'expired',
    }
  }

  if (tenantVerificationEntity.isValidated()) {
    return {
      status: 'validated',
    }
  }

  const tenant = await tenantRepository.findByEmail(
    tenantVerificationEntity.email,
  )

  return {
    status: 'ready',
    tenantVerificationEntity,
    tenant,
  }
}
