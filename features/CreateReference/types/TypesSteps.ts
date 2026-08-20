import { RequireNonNullableProperties } from '@/shared/types/RequireNonNullableProperties'
import { TypeContextCreateReference } from './TypeContextCreateReference'

export type TypeContextWithRentalToken = RequireNonNullableProperties<
  TypeContextCreateReference,
  'rentalToken'
>

export type TypeContextWithRental = RequireNonNullableProperties<
  TypeContextCreateReference,
  'rental'
>

export type TypeContextWithTenant = RequireNonNullableProperties<
  TypeContextCreateReference,
  'tenant'
>

export type TypeContextWithFormInputAndRentalAndTenant =
  RequireNonNullableProperties<
    TypeContextCreateReference,
    'formInput' | 'tenant' | 'rental'
  >
