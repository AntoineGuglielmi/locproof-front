import { Step } from '@/shared/core/useCase/Step'
import { rentalRepository } from '@/repositories/rental.repository'
import { TypeContextWithRentalToken } from '../../types/TypesSteps'

export class StepRetrieveRental extends Step<TypeContextWithRentalToken> {
  async execute(context: TypeContextWithRentalToken): Promise<void> {
    const { rentalToken } = context

    try {
      const rental = await rentalRepository.findByRentalToken(rentalToken)

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
