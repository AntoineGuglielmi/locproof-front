import { Step } from '@/shared/core/useCase/Step'
import { TypeContextWithEmail } from '../../types/TypesSteps'
import { sendEmailViaSmtp } from '@/features/Emails/lib/smtp'
import RetrieveProfileEmail from '../../components/retrieve-profile-email'
import { checkEmailFeatureFlag } from '@/shared/lib/env'

export class StepSendRetrieveProfileMailToTenant extends Step<TypeContextWithEmail> {
  async execute(context: TypeContextWithEmail): Promise<void> {
    const { tenant } = context

    if (!tenant) {
      // Wait a few seconds to fake sending a mail to an existing tenant
      await new Promise((res) => {
        setTimeout(() => {
          res(true)
        }, 5000)
      })
      return
    }

    const { slug, email: to } = tenant

    if (!to) {
      throw new Error(`Le mail de locataire n'existe pas`)
    }

    const href = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${slug}`
    const subject = 'Votre lien vers votre profil Locproof'
    const react = RetrieveProfileEmail({ href })

    try {
      const shouldSendEmail = checkEmailFeatureFlag(
        'SEND_RETRIEVE_PROFILE_EMAIL',
      )

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
