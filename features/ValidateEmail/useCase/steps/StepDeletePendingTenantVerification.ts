import { Step } from '@/shared/core/useCase/Step'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { TypeContextWithEmail } from '../../types/TypesSteps'

export class StepDeletePendingTenantVerification extends Step<TypeContextWithEmail> {
  async execute(context: TypeContextWithEmail): Promise<void> {
    const { email } = context

    await tenantVerificationRepository.deletePendingByEmail(email)
  }
}
