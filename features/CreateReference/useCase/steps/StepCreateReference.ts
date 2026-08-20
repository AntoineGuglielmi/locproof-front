import { Step } from '@/shared/core/useCase/Step'
import { referenceRepository } from '@/repositories/reference.repository'
import { TypeContextWithFormInputAndRentalAndTenant } from '../../types/TypesSteps'

export class StepCreateReference extends Step<TypeContextWithFormInputAndRentalAndTenant> {
  async execute(
    context: TypeContextWithFormInputAndRentalAndTenant,
  ): Promise<void> {
    const {
      formInput: {
        paidOnTime,
        wellMaintained,
        communication,
        recommended,
        comment,
      },
      rental,
      tenant,
    } = context

    try {
      await referenceRepository.create({
        paidOnTime,
        wellMaintained,
        communication,
        recommended,
        comment,
        rental,
        tenant,
      })
    } catch (error) {
      throw new Error('Impossible de créer la référence', {
        cause: error,
      })
    }
  }
}
