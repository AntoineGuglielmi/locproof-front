import { CreateEmailOptions, Resend } from 'resend'

const resendClient = new Resend(process.env.RESEND_API_KEY)

export const sendEmailViaResend = async ({
  from,
  to,
  subject,
  react,
}: {
  from: string
  to: string
  subject: string
  react: CreateEmailOptions['react']
}) => {
  await resendClient.emails.send({
    from,
    to,
    subject,
    react,
  })
}
