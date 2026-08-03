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
}): Promise<Tenant> => {
  const existingTenant = await tenantRepository.checkIfTenantExists(email)

  if (!existingTenant) {
    return (
      await tenantRepository.create({
        email,
        firstname,
        lastname,
      })
    ).data
  }

  return (
    await tenantRepository.update(existingTenant.documentId, {
      firstname,
      lastname,
    })
  ).data
}
