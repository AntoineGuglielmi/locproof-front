import { rentalRepository } from '@/repositories/rental.repository'
import { Rental } from '@/shared/types/strapi-types'
import { TypeServiceGetPageContextReturn } from '../types/TypeServiceGetPageContextReturn'
import { EntityRental } from '@/shared/entities/EntityRental'

export const ServiceGetPageContext = async (
  rentalToken: Rental['rentalToken'],
): Promise<TypeServiceGetPageContextReturn> => {
  const rental = await rentalRepository.findByRentalToken(rentalToken)

  if (!rental) {
    return {
      status: 'not-found',
    }
  }

  const rentalEntity = new EntityRental(rental)

  if (rentalEntity.isValidated()) {
    return {
      status: 'validated',
    }
  }

  if (rentalEntity.isExpired()) {
    return {
      status: 'expired',
    }
  }

  const { tenant } = rental

  if (!tenant) {
    return {
      status: 'tenant-not-found',
    }
  }

  return {
    status: 'ready',
    tenant,
    rental,
  }
}
