import { Step } from '@/shared/core/useCase/Step'
import NewReferenceEmail from '../../components/new-reference-email'
import { sendEmailViaSmtp } from '@/features/Emails/lib/smtp'
import { TypeContextWithRental } from '../../types/TypesSteps'

export class StepSendEmailToTenant extends Step<TypeContextWithRental> {
  async execute(context: TypeContextWithRental): Promise<void> {
    const {
      rental: { tenant },
    } = context

    if (!tenant) {
      throw new Error('Une erreur inconnue est survenue')
    }

    const { slug: tenantSlug, email: tenantEmail } = tenant

    if (tenantEmail && tenantSlug) {
      const href = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${tenantSlug}`

      const to = tenantEmail
      const subject = 'Votre recommandation a été rédigée !'
      const react = NewReferenceEmail({ href })

      try {
        const shouldSendEmail =
          !['development', 'test'].includes(process.env.NODE_ENV) ||
          process.env.SEND_TENANT_EMAIL === 'true'

        if (shouldSendEmail) {
          await sendEmailViaSmtp({ to, subject, react })
        }
      } catch (error) {
        throw new Error("Impossible d'envoyer l'email au locataire", {
          cause: error,
        })
      }
    }
  }
}
