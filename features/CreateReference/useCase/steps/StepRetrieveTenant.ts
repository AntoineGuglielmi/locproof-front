import { Step } from '@/shared/core/useCase/Step'
import { TypeContextCreateReference } from '../../types/TypeContextCreateReference'
import { tenantRepository } from '@/repositories/tenant.repository'

export class StepRetrieveTenant extends Step<TypeContextCreateReference> {
  async execute(context: TypeContextCreateReference): Promise<void> {
    const rental = context.rental
    context.tenant = await tenantRepository.findBydDocumentId(
      rental?.tenantDocumentId,
    )
  }
}
