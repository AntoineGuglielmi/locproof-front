import { Step } from '@/shared/core/useCase/Step'
import { TypeContextCreateReference } from '../../types/TypeContextCreateReference'
import { referenceRepository } from '@/repositories/reference.repository'

export class StepCreateReference extends Step<TypeContextCreateReference> {
  async execute(context: TypeContextCreateReference): Promise<void> {
    const paidOnTime = context.formInput?.paidOnTime
    const wellMaintained = context.formInput?.wellMaintained
    const communication = context.formInput?.communication
    const recommended = context.formInput?.recommended
    const comment = context.formInput?.comment
    const rentalDocumentId = context.formInput?.rentalDocumentId

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
