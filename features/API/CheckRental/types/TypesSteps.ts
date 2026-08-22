import { RequireNonNullableProperties } from '@/shared/types/RequireNonNullableProperties'
import { TypeContextCheckRental } from './TypeContextCheckRental'

export type TypeContextWithRentalTolen = RequireNonNullableProperties<
  TypeContextCheckRental,
  'rentalToken'
>

export type TypeContextWithRental = RequireNonNullableProperties<
  TypeContextCheckRental,
  'rental'
>
