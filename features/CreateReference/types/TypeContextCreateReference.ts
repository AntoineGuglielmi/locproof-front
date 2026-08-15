import { Rental, Tenant } from '@/shared/types/strapi-types'
import { TypeCreateReferenceFormValues } from './TypeCreateReferenceFormValues'

export type TypeContextCreateReference = {
  formInput?: TypeCreateReferenceFormValues | null
  rental?: Rental | null
  tenant?: Tenant | null
}
