import { Step } from '@/shared/core/useCase/Step'
import { rentalRepository } from '@/repositories/rental.repository'
import { TypeContextWithFormInput } from '../../types/TypesSteps'

export class StepValidateRental extends Step<TypeContextWithFormInput> {
  async execute(context: TypeContextWithFormInput): Promise<void> {
    const { rentalDocumentId } = context.formInput

    await rentalRepository.markAsValidated(rentalDocumentId)
  }
}
