import { Step } from '@/shared/core/useCase/Step'
import { TypeContextCheckTenantVerification } from '../../types/TypeContextCheckTenantVerification'

export class StepCheckTenantVerificationToken extends Step<TypeContextCheckTenantVerification> {
  async execute(context: TypeContextCheckTenantVerification): Promise<void> {
    const { tenantVerificationToken } = context

    if (!tenantVerificationToken) {
      context.result = 'no-verification-token'
      throw new Error('Le lien que vous avez utilisé est invalide.')
    }
  }
}
