import { Step } from '@/shared/core/useCase/Step'
import { sendEmailViaResend } from '@/features/Emails/lib/resend'
import EmailValidationEmail from '../../components/email-verification-email'
import { TypeContextWithEmailAndTenantVerification } from '../../types/TypesSteps'

export class StepSendValidationEmail extends Step<TypeContextWithEmailAndTenantVerification> {
  async execute(
    context: TypeContextWithEmailAndTenantVerification,
  ): Promise<void> {
    const { email, tenantVerificationToken } = context

    const href = `${process.env.NEXT_PUBLIC_APP_URL}/api/check-tenant-verification?tenantVerificationToken=${tenantVerificationToken}`

    const from = 'LocProof <hello@locproof.fr>'
    const to = email
    const subject = 'Validez votre adresse email'
    const react = EmailValidationEmail({ href })

    try {
      if (process.env.SEND_VALIDATION_EMAIL === 'true') {
        await sendEmailViaResend({
          from,
          to,
          subject,
          react,
        })
      }
    } catch (error) {
      throw new Error("Impossible d'envoyer l'email de validation", {
        cause: error,
      })
    }
  }
}
