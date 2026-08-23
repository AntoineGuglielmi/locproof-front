import { Step } from '@/shared/core/useCase/Step'
import { TypeContextWithTenantVerificationToken } from '../../types/TypesSteps'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'

export class StepRetrieveTenantVerification extends Step<TypeContextWithTenantVerificationToken> {
  async execute(
    context: TypeContextWithTenantVerificationToken,
  ): Promise<void> {
    const { tenantVerificationToken } = context

    let tenantVerification

    try {
      tenantVerification =
        await tenantVerificationRepository.findTenantVerificationByToken(
          tenantVerificationToken,
        )
    } catch (error) {
      throw new Error('Impossible de récupérer la vérification du locataire', {
        cause: error,
      })
    }

    if (!tenantVerification) {
      context.result = 'no-verification'
      throw new Error('Vérification du locataire introuvable')
    }

    context.tenantVerification = tenantVerification
  }
}
