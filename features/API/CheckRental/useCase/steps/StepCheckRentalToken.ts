import { Step } from '@/shared/core/useCase/Step'
import { TypeContextWithRentalTolen } from '../../types/TypesSteps'

export class StepCheckRentalToken extends Step<TypeContextWithRentalTolen> {
  async execute(context: TypeContextWithRentalTolen): Promise<void> {
    const { rentalToken } = context

    if (!rentalToken) {
      context.result = 'no-rental-token'
      throw new Error('Le lien que vous avez utilisé est invalide.')
    }
  }
}
