import { Step } from '@/shared/core/useCase/Step'
import AnswerAReferenceRequestEmail from '../../components/answer-a-reference-request-email'
import { TypeContextWithFormuInputAndRental } from '../../types/TypesSteps'
import { sendEmailViaSmtp } from '@/features/Emails/lib/smtp'

export class StepSendEmailToLandlord extends Step<TypeContextWithFormuInputAndRental> {
  async execute(context: TypeContextWithFormuInputAndRental): Promise<void> {
    const { landlordEmail } = context.formInput
    const { rentalToken } = context.rental

    const href = `${process.env.NEXT_PUBLIC_APP_URL}/api/check-rental?rentalToken=${rentalToken}`

    const to = landlordEmail!
    const subject =
      'Vous avez reçu une demande de recommandation de la part de votre ancien locataire'
    const react = AnswerAReferenceRequestEmail({ href })

    try {
      const shouldSendEmail =
        !['development', 'test'].includes(process.env.NODE_ENV) ||
        process.env.SEND_LANDLORD_EMAIL === 'true'

      if (shouldSendEmail) {
        await sendEmailViaSmtp({ to, subject, react })
      }
    } catch (error) {
      throw new Error("Impossible d'envoyer l'email au propriétaire", {
        cause: error,
      })
    }
  }
}
