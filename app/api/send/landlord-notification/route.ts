import { EmailTemplate } from '@/features/Emails/components/email-template'
import { resend } from '@/features/Emails/utils/resend'

export async function POST(req: Request) {
  const { landlordEmail, rentalToken } = await req.json()

  try {
    const { data, error } = await resend.emails.send({
      from: `LocProof <${process.env.RESEND_EMAIL_FROM}>`,
      to: landlordEmail,
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
