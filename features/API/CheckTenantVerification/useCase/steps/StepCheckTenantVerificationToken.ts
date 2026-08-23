import { Step } from '@/shared/core/useCase/Step'
import { TypeContextCheckTenantVerification } from '../../types/TypeContextCheckTenantVerification'

export class StepCheckTenantVerificationToken extends Step<TypeContextCheckTenantVerification> {
  async execute(context: TypeContextCheckTenantVerification): Promise<void> {
    const { tenantVerificationToken } = context

    if (!tenantVerificationToken) {
      context.result = 'no-verification-token'
      throw new Error(
        'Le token de la varification du locataire est introuvable',
      )
    }
  }
}
