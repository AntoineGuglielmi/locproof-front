import { Step } from '@/shared/core/useCase/Step'
import NewReferenceEmail from '../../components/new-reference-email'
import { TypeContextWithTenant } from '../../types/TypesSteps'
import { sendEmailViaSmtp } from '@/features/Emails/lib/smtp'

export class StepSendEmailToTenant extends Step<TypeContextWithTenant> {
  async execute(context: TypeContextWithTenant): Promise<void> {
    const {
      tenant: { slug: tenantSlug, email: tenantEmail },
    } = context

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
