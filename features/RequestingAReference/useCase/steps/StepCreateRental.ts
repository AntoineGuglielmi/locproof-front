import { Step } from '@/shared/core/useCase/Step'
import { rentalRepository } from '@/repositories/rental.repository'
import { TypeContextWithFormInputAndTenant } from '../../types/TypesSteps'

export class StepCreateRental extends Step<TypeContextWithFormInputAndTenant> {
  async execute(context: TypeContextWithFormInputAndTenant): Promise<void> {
    const tenantDocumentId = context.tenant.documentId
    const address = context.formInput.address
    const startDate = context.formInput.startDate
    const endDate = context.formInput.endDate
    const landlordEmail = context.formInput.landlordEmail
    const cityPublic = context.formInput.cityPublic

    const rentalToken = crypto.randomUUID()

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days from now

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
  }
}
