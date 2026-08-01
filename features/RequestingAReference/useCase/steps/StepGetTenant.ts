import { ServiceCreateTenant } from '../../services/ServiceCreateTenant'
import { Step } from '@/shared/core/useCase/Step'
import { TypeContextRequestingAReference } from '../../types/TypeContextRequestingAReference'

export class StepGetTenant extends Step<TypeContextRequestingAReference> {
  async execute(context: TypeContextRequestingAReference): Promise<void> {
    const { email, firstname, lastname } = context.formInput || {}
    context.tenant = await ServiceCreateTenant({
      email,
      firstname,
      lastname,
    })
  }
}
