import { RequireNonNullableProperties } from '@/shared/types/RequireNonNullableProperties'
import { TypeContextCreateReference } from './TypeContextCreateReference'

export type TypeContextWithFormInput = RequireNonNullableProperties<
  TypeContextCreateReference,
  'formInput'
>

export type TypeContextWithRental = RequireNonNullableProperties<
  TypeContextCreateReference,
  'rental'
>

export type TypeContextWithTenant = RequireNonNullableProperties<
  TypeContextCreateReference,
  'tenant'
>
