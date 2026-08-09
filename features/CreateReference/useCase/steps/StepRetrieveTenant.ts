import { Step } from '@/shared/core/useCase/Step'
import { tenantRepository } from '@/repositories/tenant.repository'
import { TypeContextWithRental } from '../../types/TypesSteps'

export class StepRetrieveTenant extends Step<TypeContextWithRental> {
  async execute(context: TypeContextWithRental): Promise<void> {
    const {
      rental: { tenantDocumentId },
    } = context

    try {
      const tenant = await tenantRepository.findBydDocumentId(tenantDocumentId)

      if (!tenant) {
        throw new Error('Locataire introuvable')
      }

      context.tenant = tenant
    } catch (error) {
      throw new Error('Impossible de récupérer le locataire', {
        cause: error,
      })
    }
  }
}
