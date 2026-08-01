import { Step } from '@/shared/core/useCase/Step'
import { TypeContextRequestingAReference } from '../../types/TypeContextRequestingAReference'
import AnswerAReferenceRequestEmail from '../../components/answer-a-reference-request-email'
import { sendEmailViaResend } from '@/features/Emails/lib/resend'

export class StepSendEmailToLandlord extends Step<TypeContextRequestingAReference> {
  async execute(context: TypeContextRequestingAReference): Promise<void> {
    const landlordEmail = context.formInput?.landlordEmail
    const rentalToken = context.rental?.rentalToken

    const href = `${process.env.NEXT_PUBLIC_APP_URL}/api/check-rental?rentalToken=${rentalToken}`

    const from = 'LocProof <hello@locproof.fr>'
    const to = landlordEmail!
    const subject =
      'Vous avez reçu une demande de recommandation de la part de votre ancien locataire'
    const react = AnswerAReferenceRequestEmail({ href })

    await sendEmailViaResend({ from, to, subject, react })
  }
}
