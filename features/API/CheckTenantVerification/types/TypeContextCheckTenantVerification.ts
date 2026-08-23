import { TenantVerification } from '@/shared/types/strapi-types'
import { TypeCheckTenantVerificationResult } from './TypeCheckTenantVerificationResult'

export type TypeContextCheckTenantVerification = {
  tenantVerificationToken?: TenantVerification['tenantVerificationToken'] | null
  tenantVerification?: TenantVerification | null
  result?: TypeCheckTenantVerificationResult | null
}
