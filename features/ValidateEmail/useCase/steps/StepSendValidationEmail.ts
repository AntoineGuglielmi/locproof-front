import { Step } from '@/shared/core/useCase/Step'
import { TypeContextValidateEmail } from '../../types/TypeContextValidateEmail'
import { sendEmailViaResend } from '@/features/Emails/lib/resend'
import EmailValidationEmail from '../../components/email-verification-email'

export class StepSendValidationEmail extends Step<TypeContextValidateEmail> {
  async execute(context: TypeContextValidateEmail): Promise<void> {
    const email = context.email
    const tenantVerificationToken = context.tenantVerificationToken

    const href = `${process.env.NEXT_PUBLIC_APP_URL}/api/check-tenant-verification?tenantVerificationToken=${tenantVerificationToken}`

    const from = 'LocProof <hello@locproof.fr>'
    const to = email!
    const subject = 'Validez votre adresse email'
    const react = EmailValidationEmail({ href })

    await sendEmailViaResend({
      from,
      to,
      subject,
      react,
    })
  }
}
