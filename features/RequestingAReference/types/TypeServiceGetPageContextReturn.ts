import { EntityTenantVerification } from '@/shared/entities/EntityTenantVerification'
import { Tenant } from '@/shared/types/strapi-types'

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
      status: 'ready'
      tenantVerificationEntity: EntityTenantVerification
      tenant: Tenant | null
    }
