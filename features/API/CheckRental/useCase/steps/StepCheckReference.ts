import { Step } from '@/shared/core/useCase/Step'
import { TypeContextWithRental } from '../../types/TypesSteps'
import { referenceRepository } from '@/repositories/reference.repository'

export class StepCheckReference extends Step<TypeContextWithRental> {
  async execute(context: TypeContextWithRental): Promise<void> {
    const {
      rental: { documentId: rentalDocumentId },
    } = context

    let reference

    try {
      reference =
        await referenceRepository.findByRentalDocumentId(rentalDocumentId)
    } catch (error) {
      throw new Error('Impossible de récupérer la référence', {
        cause: error,
      })
    }

    if (reference) {
      context.result = 'rental-already-validated'
      throw new Error('Cette demande de référence a déjà été traitée')
    }
  }
}
