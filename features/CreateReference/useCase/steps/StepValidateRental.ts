import { Step } from '@/shared/core/useCase/Step'
import { TypeContextCreateReference } from '../../types/TypeContextCreateReference'
import { rentalRepository } from '@/repositories/rental.repository'

export class StepValidateRental extends Step<TypeContextCreateReference> {
  async execute(context: TypeContextCreateReference): Promise<void> {
    const rentalDocumentId = context.formInput?.rentalDocumentId

    await rentalRepository.markAsValidated(rentalDocumentId)
  }
}
