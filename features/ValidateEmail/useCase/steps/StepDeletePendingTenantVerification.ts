import { Step } from '@/shared/core/useCase/Step'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { TypeContextWithEmail } from '../../types/TypesSteps'

export class StepDeletePendingTenantVerification extends Step<TypeContextWithEmail> {
  async execute(context: TypeContextWithEmail): Promise<void> {
    try {
      await tenantVerificationRepository.deletePendingByEmail(context.email)
    } catch (error) {
      throw new Error('Impossible de supprimer la vérification existante', {
        cause: error,
      })
    }
  }
}
