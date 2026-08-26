import { RequireNonNullableProperties } from '@/shared/types/RequireNonNullableProperties'
import { TypeContextCheckTenantVerification } from './TypeContextCheckTenantVerification'

export type TypeContextWithTenantVerificationToken =
  RequireNonNullableProperties<
    TypeContextCheckTenantVerification,
    'tenantVerificationToken'
  >
export type TypeContextWithTenantVerificationTokenAndTenantVerification =
  RequireNonNullableProperties<
    TypeContextCheckTenantVerification,
    'tenantVerificationToken' | 'tenantVerification'
  >
