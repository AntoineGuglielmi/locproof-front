import { Rental, Tenant } from '@/types/strapi-types'
import { TypeInputCreateReference } from './TypeInputCreateReference'

export type TypeContextCreateReference = {
  formInput?: TypeInputCreateReference | null
  rental?: Rental | null
  tenant?: Tenant | null
}
