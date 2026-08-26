import { Step } from '@/shared/core/useCase/Step'
import EmailValidationEmail from '../../components/email-verification-email'
import { TypeContextWithEmailAndTenantVerification } from '../../types/TypesSteps'
import { sendEmailViaSmtp } from '@/features/Emails/lib/smtp'

export class StepSendValidationEmail extends Step<TypeContextWithEmailAndTenantVerification> {
  async execute(
    context: TypeContextWithEmailAndTenantVerification,
  ): Promise<void> {
    const { email, tenantVerificationToken } = context

    const href = `${process.env.NEXT_PUBLIC_APP_URL}/api/check-tenant-verification?tenantVerificationToken=${tenantVerificationToken}`

    const to = email
    const subject = 'Validez votre adresse email'
    const react = EmailValidationEmail({ href })

    try {
      const shouldSendEmail =
        !['development', 'test'].includes(process.env.NODE_ENV) ||
        process.env.SEND_VALIDATION_EMAIL === 'true'

      if (shouldSendEmail) {
        await sendEmailViaSmtp({
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
