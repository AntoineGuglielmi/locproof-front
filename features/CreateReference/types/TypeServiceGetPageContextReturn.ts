import { Rental, Tenant } from '@/shared/types/strapi-types'

export type TypeServiceGetPageContextReturn =
  | {
      status: 'not-found'
    }
  | {
      status: 'expired'
    }
  | {
      status: 'validated'
    }
  | {
      status: 'tenant-not-found'
    }
  | {
      status: 'ready'
      tenant: Tenant
      rental: Rental
    }
