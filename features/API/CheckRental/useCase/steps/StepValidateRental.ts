import { Step } from '@/shared/core/useCase/Step'
import { TypeContextWithRental } from '../../types/TypesSteps'
import { EntityRental } from '@/shared/entities/EntityRental'

export class StepValidateRental extends Step<TypeContextWithRental> {
  async execute(context: TypeContextWithRental): Promise<void> {
    const { rental } = context

    const rentalEntity = new EntityRental(rental)

    if (rentalEntity.isExpired()) {
      context.result = 'rental-expired'
      throw new Error('La demande de référence a expiré')
    }

    if (rentalEntity.isValidated()) {
      context.result = 'rental-already-validated'
      throw new Error('Cette demande de référence a déjà été traitée')
    }
  }
}
