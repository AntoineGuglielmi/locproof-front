import { Step } from '@/shared/core/useCase/Step'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { TypeContextRequestingAReference } from '../../types/TypeContextRequestingAReference'

export class StepValidateTenantVerification extends Step<TypeContextRequestingAReference> {
  async execute(context: TypeContextRequestingAReference): Promise<void> {
    const tenantVerificationDocumentId = context.tenantVerification?.documentId
    await tenantVerificationRepository.markAsValidated(
      tenantVerificationDocumentId,
    )
  }
}
