import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { Step } from '@/shared/core/useCase/Step'
import { TypeContextRequestingAReference } from '../../types/TypeContextRequestingAReference'

export class StepGetTenantVerification extends Step<TypeContextRequestingAReference> {
  async execute(context: TypeContextRequestingAReference): Promise<void> {
    const tenantVerificationToken = context.formInput?.tenantVerificationToken
    context.tenantVerification =
      await tenantVerificationRepository.findTenantVerificationByToken(
        tenantVerificationToken,
      )
  }
}
