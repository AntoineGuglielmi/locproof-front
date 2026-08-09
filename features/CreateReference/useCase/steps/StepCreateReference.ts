import { Step } from '@/shared/core/useCase/Step'
import { referenceRepository } from '@/repositories/reference.repository'
import { TypeContextWithFormInput } from '../../types/TypesSteps'

export class StepCreateReference extends Step<TypeContextWithFormInput> {
  async execute(context: TypeContextWithFormInput): Promise<void> {
    const {
      paidOnTime,
      wellMaintained,
      communication,
      recommended,
      comment,
      rentalDocumentId,
    } = context.formInput

    try {
      await referenceRepository.create({
        paidOnTime,
        wellMaintained,
        communication,
        recommended,
        comment,
        rentalDocumentId,
      })
    } catch (error) {
      throw new Error('Impossible de créer la référence', {
        cause: error,
      })
    }
  }
}
