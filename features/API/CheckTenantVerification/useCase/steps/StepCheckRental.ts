import { Step } from '@/shared/core/useCase/Step'
import { TypeContextWithTenantVerificationToken } from '../../types/TypesSteps'
import { rentalRepository } from '@/repositories/rental.repository'

export class StepCheckRental extends Step<TypeContextWithTenantVerificationToken> {
  async execute(
    context: TypeContextWithTenantVerificationToken,
  ): Promise<void> {
    const { tenantVerificationToken } = context

    let rental

    try {
      rental = await rentalRepository.findByTenantVerificationToken(
        tenantVerificationToken,
      )
    } catch (error) {
      throw new Error('Impossible de récupérer la location', {
        cause: error,
      })
    }

    if (rental) {
      context.result = 'verification-already-validated'
      throw new Error('Ce lien de vérification a déà été utilisé')
    }
  }
}
