import { RequireNonNullableProperties } from '@/shared/types/RequireNonNullableProperties'
import { TypeContextRetrieveProfile } from './TypeContextRetrieveProfile'

export type TypeContextWithEmail = RequireNonNullableProperties<
  TypeContextRetrieveProfile,
  'email'
>
