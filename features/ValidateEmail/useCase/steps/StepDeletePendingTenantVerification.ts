import { Step } from '@/shared/core/useCase/Step'
import { TypeContextValidateEmail } from '../../types/TypeContextValidateEmail'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'

export class StepDeletePendingTenantVerification extends Step<TypeContextValidateEmail> {
  async execute(context: TypeContextValidateEmail): Promise<void> {
    const email = context.email!

    await tenantVerificationRepository.deletePendingByEmail(email)
  }
}
