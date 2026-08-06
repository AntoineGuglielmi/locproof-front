import { ServiceCreateTenant } from '../../services/ServiceCreateTenant'
import { Step } from '@/shared/core/useCase/Step'
import { TypeContextWithFormInput } from '../../types/TypesSteps'

export class StepGetTenant extends Step<TypeContextWithFormInput> {
  async execute(context: TypeContextWithFormInput): Promise<void> {
    const { email, firstname, lastname } = context.formInput

    try {
      context.tenant = await ServiceCreateTenant({
        email,
        firstname,
        lastname,
      })
    } catch (error) {
      throw new Error(
        "Impossible de récupérer le locataire à l'origine de la demande",
        {
          cause: error,
        },
      )
    }
  }
}
