import { Step } from '@/shared/core/useCase/Step'
import { rentalRepository } from '@/repositories/rental.repository'
import { TypeContextWithFormInputAndTenant } from '../../types/TypesSteps'

export class StepCreateRental extends Step<TypeContextWithFormInputAndTenant> {
  async execute(context: TypeContextWithFormInputAndTenant): Promise<void> {
    const tenantDocumentId = context.tenant.documentId
    const {
      address: { city: cityPublic, label: address },
      startDate,
      endDate,
      landlordEmail,
    } = context.formInput

    const rentalToken = crypto.randomUUID()

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days from now

    try {
      context.rental = await rentalRepository.create({
        address,
        startDate,
        endDate,
        landlordEmail,
        tenantDocumentId,
        expiresAt,
        rentalToken,
        cityPublic,
      })
    } catch (error) {
      throw new Error('Impossible de créer la location', {
        cause: error,
      })
    }
  }
}
