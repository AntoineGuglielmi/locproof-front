import { Tenant, TenantVerification } from '@/shared/types/strapi-types'

export type TypeContextValidateEmail = {
  email?: Tenant['email'] | null
  tenantVerificationToken?: TenantVerification['tenantVerificationToken'] | null
}
