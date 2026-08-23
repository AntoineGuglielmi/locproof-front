import { Step } from '@/shared/core/useCase/Step'
import { rentalRepository } from '@/repositories/rental.repository'
import { TypeContextWithFormInputAndTenantAndTenantVerification } from '../../types/TypesSteps'

export class StepCreateRental extends Step<TypeContextWithFormInputAndTenantAndTenantVerification> {
  async execute(
    context: TypeContextWithFormInputAndTenantAndTenantVerification,
  ): Promise<void> {
    const { tenant, tenantVerification, formInput } = context
    const {
      address: { city: cityPublic, label: address },
      startDate,
      endDate,
      landlordEmail,
    } = formInput

    const overlappingRental = await rentalRepository.findOverlappingRental({
      tenant,
      startDate,
      endDate,
    })

    if (overlappingRental) {
      throw new Error(
        'Ce locataire possède déjà une location sur cette période.',
      )
    }

    const rentalToken = crypto.randomUUID()

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days from now

    try {
      context.rental = await rentalRepository.create({
        address,
        startDate,
        endDate,
        landlordEmail,
        expiresAt,
        rentalToken,
        cityPublic,
        tenant,
        tenantVerification,
      })
    } catch (error) {
      throw new Error('Impossible de créer la location', {
        cause: error,
      })
    }
  }
}
