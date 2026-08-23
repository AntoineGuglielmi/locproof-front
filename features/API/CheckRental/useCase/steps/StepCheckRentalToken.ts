import { Step } from '@/shared/core/useCase/Step'
import { TypeContextWithRentalTolen } from '../../types/TypesSteps'

export class StepCheckRentalToken extends Step<TypeContextWithRentalTolen> {
  async execute(context: TypeContextWithRentalTolen): Promise<void> {
    const { rentalToken } = context

    if (!rentalToken) {
      context.result = 'no-rental-token'
      throw new Error('Le token de la location est introuvable')
    }
  }
}
