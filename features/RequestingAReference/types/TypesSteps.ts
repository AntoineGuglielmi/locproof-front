import { RequireNonNullableProperties } from '@/shared/types/RequireNonNullableProperties'
import { TypeContextRequestingAReference } from './TypeContextRequestingAReference'

export type TypeContextWithFormInput = RequireNonNullableProperties<
  TypeContextRequestingAReference,
  'formInput'
>

export type TypeContextWithFormInputAndTenant = RequireNonNullableProperties<
  TypeContextRequestingAReference,
  'formInput' | 'tenant'
>

export type TypeContextWithTenantVerification = RequireNonNullableProperties<
  TypeContextRequestingAReference,
  'tenantVerification'
>

export type TypeContextWithFormuInputAndRental = RequireNonNullableProperties<
  TypeContextRequestingAReference,
  'formInput' | 'rental'
>
