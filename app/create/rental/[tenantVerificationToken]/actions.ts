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
  cityPublic,
}: {
  email: Tenant['email']
  firstname: Tenant['firstname']
  lastname: Tenant['lastname']
  address: Rental['address']
  startDate: Rental['startDate']
  endDate: Rental['endDate']
  landlordEmail: Rental['landlordEmail']
  tenantVerificationToken: TenantVerification['tenantVerificationToken']
  cityPublic: Rental['cityPublic']
}): Promise<void> => {
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
  const { rentalToken } = await ServiceCreateRental({
    address,
    startDate,
    endDate,
    landlordEmail,
    tenantDocumentId,
    cityPublic,
  })

  await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/send/landlord-notification`,
    {
      method: 'POST',
      body: JSON.stringify({
        landlordEmail,
        rentalToken,
      }),
    },
  )

  await tenantVerificationRepository.markAsValidated(
    tenantVerification!.documentId,
  )
}
