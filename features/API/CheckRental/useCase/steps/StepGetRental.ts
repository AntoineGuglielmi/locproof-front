import { Step } from '@/shared/core/useCase/Step'
import { rentalRepository } from '@/repositories/rental.repository'
import { TypeContextWithRentalTolen } from '../../types/TypesSteps'

export class StepGetRental extends Step<TypeContextWithRentalTolen> {
  async execute(context: TypeContextWithRentalTolen): Promise<void> {
    const { rentalToken } = context

    let rental

    try {
      rental = await rentalRepository.findByRentalToken(rentalToken)
    } catch (error) {
      throw new Error('Impossible de récupérer la location', {
        cause: error,
      })
    }

    if (!rental) {
      context.result = 'no-rental'
      throw new Error('Location introuvable')
    }

    context.rental = rental
  }
}
