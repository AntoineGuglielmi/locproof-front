import { Tenant } from '@/shared/types/strapi-types'

export type TypeContextRetrieveProfile = {
  email?: Tenant['email'] | null
  tenant?: Tenant | null
}
