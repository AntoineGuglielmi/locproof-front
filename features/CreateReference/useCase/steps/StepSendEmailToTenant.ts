import { Step } from '@/shared/core/useCase/Step'
import { TypeContextCreateReference } from '../../types/TypeContextCreateReference'
import { sendEmailViaResend } from '@/features/Emails/lib/resend'
import NewReferenceEmail from '../../components/new-reference-email'

export class StepSendEmailToTenant extends Step<TypeContextCreateReference> {
  async execute(context: TypeContextCreateReference): Promise<void> {
    const tenant = context.tenant
    const tenantSlug = tenant?.slug
    const tenantEmail = tenant?.email

    if (tenant?.email && tenant?.slug) {
      const href = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${tenantSlug}`

      const from = 'LocProof <hello@locproof.fr>'
      const to = tenantEmail!
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
