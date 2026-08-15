import { Step } from '@/shared/core/useCase/Step'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { TypeContextWithEmail } from '../../types/TypesSteps'

export class StepCreateNewTenantVerification extends Step<TypeContextWithEmail> {
  async execute(context: TypeContextWithEmail): Promise<void> {
    const { email } = context

    const tenantVerificationToken = crypto.randomUUID()

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h

    try {
      await tenantVerificationRepository.create({
        email,
        tenantVerificationToken,
        expiresAt,
      })
    } catch (error) {
      throw new Error('Impossible de créer le token de vérification', {
        cause: error,
      })
    }

    context.tenantVerificationToken = tenantVerificationToken
  }
}
