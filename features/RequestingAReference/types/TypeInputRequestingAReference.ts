import { Rental, Tenant, TenantVerification } from '@/shared/types/strapi-types'
import { TypeAddressValue } from '@/shared/types/TypeAddressValue'

export type TypeInputRequestingAReference = {
  email: Tenant['email']
  firstname: Tenant['firstname']
  lastname: Tenant['lastname']
  address: TypeAddressValue
  startDate: Rental['startDate']
  endDate: Rental['endDate']
  landlordEmail: Rental['landlordEmail']
  tenantVerificationToken: TenantVerification['tenantVerificationToken']
}
