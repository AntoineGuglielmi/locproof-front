import { sendEmailViaResend } from '@/features/Emails/lib/resend'
import { StepSendValidationEmail } from './StepSendValidationEmail'

vi.mock('@/features/Emails/lib/resend', () => ({
  sendEmailViaResend: vi.fn(),
}))

describe('StepSendValidationEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sends validation email when emails are enabled', async () => {
    process.env.NEXT_PUBLIC_SEND_EMAILS = 'true'

    await new StepSendValidationEmail().execute({
      email: 'hello@example.com',
      tenantVerificationToken: 'token-123',
    })

    expect(sendEmailViaResend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'hello@example.com',
      }),
    )
  })
})
