import { tenantRepository } from '@/repositories/tenant.repository'
import { Tenant } from '@/shared/types/strapi-types'

export const ServiceCreateTenant = async ({
  email,
  firstname,
  lastname,
}: {
  email: Tenant['email']
  firstname: Tenant['firstname']
  lastname: Tenant['lastname']
}) => {
  let tenant
  const existingTenant = await tenantRepository.checkIfTenantExists(email)
  if (!existingTenant) {
    tenant = (
      await tenantRepository.create({
        email,
        firstname,
        lastname,
      })
    ).data
  } else {
    tenant = (
      await tenantRepository.update(existingTenant.documentId, {
        firstname,
        lastname,
      })
    ).data
  }
  return tenant
}
