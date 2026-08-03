import { RequireNonNullableProperties } from '@/shared/types/RequireNonNullableProperties'
import { TypeContextValidateEmail } from './TypeContextValidateEmail'

export type TypeContextWithEmail = RequireNonNullableProperties<
  TypeContextValidateEmail,
  'email'
>

export type TypeContextWithEmailAndTenantVerification =
  RequireNonNullableProperties<
    TypeContextValidateEmail,
    'email' | 'tenantVerificationToken'
  >
