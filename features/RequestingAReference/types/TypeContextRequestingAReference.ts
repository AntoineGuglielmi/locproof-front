import { Rental, Tenant, TenantVerification } from '@/shared/types/strapi-types'
import { TypeInputRequestingAReference } from './TypeInputRequestingAReference'

export type TypeContextRequestingAReference = {
  formInput?: TypeInputRequestingAReference | null
  tenantVerification?: TenantVerification | null
  tenant?: Tenant | null
  rental?: Rental | null
}
