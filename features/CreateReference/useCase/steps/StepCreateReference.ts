import { Step } from '@/shared/core/useCase/Step'
import { referenceRepository } from '@/repositories/reference.repository'
import { TypeContextWithFormInputAndRental } from '../../types/TypesSteps'

export class StepCreateReference extends Step<TypeContextWithFormInputAndRental> {
  async execute(context: TypeContextWithFormInputAndRental): Promise<void> {
    const {
      formInput: {
        paidOnTime,
        wellMaintained,
        communication,
        recommended,
        comment,
      },
      rental,
    } = context

    try {
      await referenceRepository.create({
        paidOnTime,
        wellMaintained,
        communication,
        recommended,
        comment,
        rental,
      })
    } catch (error) {
      throw new Error('Impossible de créer la référence', {
        cause: error,
      })
    }
  }
}
