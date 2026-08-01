import { Step } from '@/shared/core/useCase/Step'
import { TypeContextValidateEmail } from '../../types/TypeContextValidateEmail'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'

export class StepCreateNewTenantVerification extends Step<TypeContextValidateEmail> {
  async execute(context: TypeContextValidateEmail): Promise<void> {
    const email = context.email!

    const tenantVerificationToken = crypto.randomUUID()

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h

    await tenantVerificationRepository.create({
      email,
      tenantVerificationToken,
      expiresAt,
    })

    context.tenantVerificationToken = tenantVerificationToken
  }
}
