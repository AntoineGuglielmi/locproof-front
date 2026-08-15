import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { Step } from '@/shared/core/useCase/Step'
import { TypeContextWithFormInput } from '../../types/TypesSteps'

export class StepGetTenantVerification extends Step<TypeContextWithFormInput> {
  async execute(context: TypeContextWithFormInput): Promise<void> {
    const { tenantVerificationToken } = context.formInput

    try {
      context.tenantVerification =
        await tenantVerificationRepository.findTenantVerificationByToken(
          tenantVerificationToken,
        )
    } catch (error) {
      throw new Error(
        'Impossible de récupérer le token de la vérification existante',
        {
          cause: error,
        },
      )
    }
  }
}
