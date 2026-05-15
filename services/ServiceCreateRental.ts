import { sendEmailToLandlord } from '@/lib/email'
import { rentalRepository } from '@/repositories/rental.repository'
import { Rental } from '@/types/strapi-types'

export const ServiceCreateRental = async ({
  address,
  startDate,
  endDate,
  landlordEmail,
  tenantDocumentId,
  cityPublic,
}: {
  address: Rental['address']
  startDate: Rental['startDate']
  endDate: Rental['endDate']
  landlordEmail: Rental['landlordEmail']
  tenantDocumentId: Rental['tenantDocumentId']
  cityPublic: Rental['cityPublic']
}) => {
  const rentalToken = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days from now
  await rentalRepository.create({
    address,
    startDate,
    endDate,
    landlordEmail,
    tenantDocumentId,
    expiresAt,
    rentalToken,
    cityPublic,
  })
  await sendEmailToLandlord({
    landlordEmail,
    rentalToken,
  })
}
