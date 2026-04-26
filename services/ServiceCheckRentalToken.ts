import { referenceRepository } from '@/repositories/reference.repository'
import { rentalRepository } from '@/repositories/rental.repository'
import { Rental } from '@/types/strapi-types'

export const ServiceCheckRentalToken = async ({
  rentalToken,
}: {
  rentalToken: Rental['rentalToken']
}): Promise<{
  ok: boolean
  redirectTo: string
}> => {
  const rental = await rentalRepository.findByRentalToken(rentalToken)
  if (!rental) {
    return { ok: false, redirectTo: '/error/no-rental' }
  }

  const rentalIsExpired = new Date(rental.expiresAt!) < new Date()
  if (rentalIsExpired) {
    return { ok: false, redirectTo: '/error/rental-expired' }
  }

  const referenceAlreadyExists = await referenceRepository.findByRentalToken(
    rental.documentId,
  )
  if (referenceAlreadyExists || rental.state === 'validated') {
    return { ok: false, redirectTo: '/error/rental-already-validated' }
  }

  return { ok: true, redirectTo: `/validate/${rentalToken}` }
}
