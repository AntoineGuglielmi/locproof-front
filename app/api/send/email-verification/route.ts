import { EmailTemplate } from '@/features/Emails/components/email-template'
import { resend } from '@/features/Emails/utils/resend'

export async function POST(req: Request) {
  const { email, tenantVerificationToken } = await req.json()
  const { RESEND_EMAIL_FROM } = process.env
  console.log({
    email,
    tenantVerificationToken,
    RESEND_EMAIL_FROM,
  })

  try {
    const { data, error } = await resend.emails.send({
      from: `LocProof <${RESEND_EMAIL_FROM}>`,
      to: [email],
      subject: 'Hello world',
      html: '<p>ça me surgonfle</p>',
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
