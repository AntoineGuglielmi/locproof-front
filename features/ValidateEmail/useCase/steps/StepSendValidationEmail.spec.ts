import { sendEmailViaSmtp } from '@/features/Emails/lib/smtp'
import { StepSendValidationEmail } from './StepSendValidationEmail'

vi.mock('@/features/Emails/lib/smtp', () => ({
  sendEmailViaSmtp: vi.fn(),
}))

describe('StepSendValidationEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sends validation email when emails are enabled', async () => {
    process.env.SEND_VALIDATION_EMAIL = 'true'

    await new StepSendValidationEmail().execute({
      email: 'hello@example.com',
      tenantVerificationToken: 'token-123',
    })

    expect(sendEmailViaSmtp).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'hello@example.com',
      }),
    )
  })
})
