import { Step } from '@/shared/core/useCase/Step'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { TypeContextWithTenantVerification } from '../../types/TypesSteps'

export class StepValidateTenantVerification extends Step<TypeContextWithTenantVerification> {
  async execute(context: TypeContextWithTenantVerification): Promise<void> {
    const { documentId: tenantVerificationDocumentId } =
      context.tenantVerification

    try {
      await tenantVerificationRepository.markAsValidated(
        tenantVerificationDocumentId,
      )
    } catch (error) {
      throw new Error('Impossible de valider la vérification', {
        cause: error,
      })
    }
  }
}
