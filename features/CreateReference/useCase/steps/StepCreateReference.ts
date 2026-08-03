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

    await referenceRepository.create({
      paidOnTime,
      wellMaintained,
      communication,
      recommended,
      comment,
      rentalDocumentId,
    })
  }
}
