import { Step } from '@/shared/core/useCase/Step'
import { rentalRepository } from '@/repositories/rental.repository'
import { TypeContextWithRental } from '../../types/TypesSteps'

export class StepValidateRental extends Step<TypeContextWithRental> {
  async execute(context: TypeContextWithRental): Promise<void> {
    const {
      rental: { documentId: rentalDocumentId },
    } = context

    try {
      await rentalRepository.markAsValidated(rentalDocumentId)
    } catch (error) {
      throw new Error('Impossible de valider la location', {
        cause: error,
      })
    }
  }
}
