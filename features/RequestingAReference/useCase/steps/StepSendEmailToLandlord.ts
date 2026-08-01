import { Step } from '@/shared/core/useCase/Step'
import { sendEmailToLandlord } from '@/lib/email'
import { TypeContextRequestingAReference } from '../../types/TypeContextRequestingAReference'

export class StepSendEmailToLandlord extends Step<TypeContextRequestingAReference> {
  async execute(context: TypeContextRequestingAReference): Promise<void> {
    const landlordEmail = context.formInput?.landlordEmail

    const rentalToken = context.rental?.rentalToken

    await sendEmailToLandlord({
      landlordEmail,
      rentalToken,
    })
  }
}
