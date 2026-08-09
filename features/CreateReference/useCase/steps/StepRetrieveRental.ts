import { Step } from '@/shared/core/useCase/Step'
import { rentalRepository } from '@/repositories/rental.repository'
import { TypeContextWithFormInput } from '../../types/TypesSteps'

export class StepRetrieveRental extends Step<TypeContextWithFormInput> {
  async execute(context: TypeContextWithFormInput): Promise<void> {
    const { rentalDocumentId } = context.formInput

    try {
      const rental = await rentalRepository.findByDocumentId(rentalDocumentId)

      if (!rental) {
        throw new Error('Location introuvable')
      }

      context.rental = rental
    } catch (error) {
      throw new Error('Impossible de récupérer la location', {
        cause: error,
      })
    }
  }
}
