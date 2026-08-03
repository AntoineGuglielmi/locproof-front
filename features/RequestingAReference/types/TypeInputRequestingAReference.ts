import { Rental, Tenant, TenantVerification } from '@/shared/types/strapi-types'

export type TypeInputRequestingAReference = {
  email: Tenant['email']
  firstname: Tenant['firstname']
  lastname: Tenant['lastname']
  address: Rental['address']
  startDate: Rental['startDate']
  endDate: Rental['endDate']
  landlordEmail: Rental['landlordEmail']
  tenantVerificationToken: TenantVerification['tenantVerificationToken']
  cityPublic: Rental['cityPublic']
}
