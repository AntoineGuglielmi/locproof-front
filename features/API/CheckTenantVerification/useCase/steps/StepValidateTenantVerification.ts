import { Step } from '@/shared/core/useCase/Step'
import { TypeContextWithTenantVerificationTokenAndTenantVerification } from '../../types/TypesSteps'
import { EntityTenantVerification } from '@/shared/entities/EntityTenantVerification'

export class StepValidateTenantVerification extends Step<TypeContextWithTenantVerificationTokenAndTenantVerification> {
  async execute(
    context: TypeContextWithTenantVerificationTokenAndTenantVerification,
  ): Promise<void> {
    const { tenantVerification } = context

    const tenantVerificationEntity = new EntityTenantVerification(
      tenantVerification,
    )

    if (tenantVerificationEntity.isValidated()) {
      context.result = 'verification-already-validated'
      throw new Error('Ce lien de vérification a déà été utilisé')
    }

    if (tenantVerificationEntity.isExpired()) {
      context.result = 'verification-expired'
      throw new Error('Ce lien de vérification est expiré')
    }
  }
}
