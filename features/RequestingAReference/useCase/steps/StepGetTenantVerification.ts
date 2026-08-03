import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { Step } from '@/shared/core/useCase/Step'
import { TypeContextWithFormInput } from '../../types/TypesSteps'

export class StepGetTenantVerification extends Step<TypeContextWithFormInput> {
  async execute(context: TypeContextWithFormInput): Promise<void> {
    const { tenantVerificationToken } = context.formInput

    context.tenantVerification =
      await tenantVerificationRepository.findTenantVerificationByToken(
        tenantVerificationToken,
      )
  }
}
