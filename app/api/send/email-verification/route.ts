import { resend } from '../../../../features/Emails/utils/resend'
import { emailElement } from './tamere'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    console.log('STEP 1')

    console.log('STEP 2')

    const result = await resend.emails.send({
      from: `LocProof <${process.env.RESEND_EMAIL_FROM}>`,
      to: ['tonmail@test.com'],
      subject: 'Test',
      react: emailElement,
    })

    console.log('STEP 3', result)

    return Response.json(result)
  } catch (e) {
    console.error('ERROR', e)
    return Response.json({ error: 'fail' }, { status: 500 })
  }
}
