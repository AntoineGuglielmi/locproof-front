import { Step } from '@/shared/core/useCase/Step'
import { sendEmailViaResend } from '@/features/Emails/lib/resend'
import NewReferenceEmail from '../../components/new-reference-email'
import { TypeContextWithTenant } from '../../types/TypesSteps'

export class StepSendEmailToTenant extends Step<TypeContextWithTenant> {
  async execute(context: TypeContextWithTenant): Promise<void> {
    const {
      tenant: { slug: tenantSlug, email: tenantEmail },
    } = context

    if (tenantEmail && tenantSlug) {
      const href = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${tenantSlug}`

      const from = 'LocProof <hello@locproof.fr>'
      const to = tenantEmail
      const subject = 'Votre recommandation a été rédigée !'
      const react = NewReferenceEmail({ href })

      await sendEmailViaResend({
        from,
        to,
        subject,
        react,
      })
    }
  }
}
