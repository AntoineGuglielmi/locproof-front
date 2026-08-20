import { Step } from '@/shared/core/useCase/Step'
import { TypeContextWithEmail } from '../../types/TypesSteps'
import { tenantRepository } from '@/repositories/tenant.repository'

export class StepRetrieveTenant extends Step<TypeContextWithEmail> {
  async execute(context: TypeContextWithEmail): Promise<void> {
    const { email } = context

    try {
      const tenant = await tenantRepository.findByEmail(email)

      context.tenant = tenant
    } catch (error) {
      throw new Error('Impossible de récupérer le locataire', {
        cause: error,
      })
    }
  }
}
