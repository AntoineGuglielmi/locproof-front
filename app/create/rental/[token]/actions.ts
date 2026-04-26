'use server'

import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { ServiceCreateRental } from '@/services/ServiceCreateRental'
import { ServiceCreateTenant } from '@/services/ServiceCreateTenant'
import { Rental, Tenant, TenantVerification } from '@/types/strapi-types'

export const ActionSubmitCreateRentalForm = async ({
  email,
  firstname,
  lastname,
  address,
  startDate,
  endDate,
  landlordEmail,
  tenantVerificationToken,
}: {
  email: Tenant['email']
  firstname: Tenant['firstname']
  lastname: Tenant['lastname']
  address: Rental['address']
  startDate: Rental['startDate']
  endDate: Rental['endDate']
  landlordEmail: Rental['landlordEmail']
  tenantVerificationToken: TenantVerification['tenantVerificationToken']
}) => {
  const tenantVerification =
    await tenantVerificationRepository.findTenantVerificationByToken(
      tenantVerificationToken,
    )
  const tenant = await ServiceCreateTenant({
    email,
    firstname,
    lastname,
  })
  const { documentId: tenantDocumentId } = tenant
  await ServiceCreateRental({
    address,
    startDate,
    endDate,
    landlordEmail,
    tenantDocumentId,
  })

  // await tenantVerificationRepository.markAsValidated(
  //   tenantVerification!.documentId,
  // )
}
