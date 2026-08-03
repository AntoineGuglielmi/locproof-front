import { Step } from '@/shared/core/useCase/Step'
import { tenantRepository } from '@/repositories/tenant.repository'
import { TypeContextWithRental } from '../../types/TypesSteps'

export class StepRetrieveTenant extends Step<TypeContextWithRental> {
  async execute(context: TypeContextWithRental): Promise<void> {
    const {
      rental: { tenantDocumentId },
    } = context

    context.tenant = await tenantRepository.findBydDocumentId(tenantDocumentId)
  }
}
