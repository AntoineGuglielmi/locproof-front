import { Step } from '@/shared/core/useCase/Step'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { TypeContextWithTenantVerification } from '../../types/TypesSteps'

export class StepValidateTenantVerification extends Step<TypeContextWithTenantVerification> {
  async execute(context: TypeContextWithTenantVerification): Promise<void> {
    const { documentId: tenantVerificationDocumentId } =
      context.tenantVerification

    await tenantVerificationRepository.markAsValidated(
      tenantVerificationDocumentId,
    )
  }
}
