import { sendEmailViaSmtp } from '@/features/Emails/lib/smtp'
import { TypeContextValidateEmail } from '../types/TypeContextValidateEmail'
import { UseCaseValidateEmail } from './UseCaseValidateEmail'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'

vi.mock('@/repositories/tenant-verification.repository', () => ({
  tenantVerificationRepository: {
    deletePendingByEmail: vi.fn(),
    create: vi.fn(),
  },
}))

vi.mock('@/features/Emails/lib/smtp', () => ({
  sendEmailViaSmtp: vi.fn(),
}))

describe('UseCaseValidateEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEXT_PUBLIC_SEND_EMAILS = 'true'
  })

  it('completes a validate email workflow', async () => {
    process.env.SEND_VALIDATION_EMAIL = 'true'

    const context: TypeContextValidateEmail = {
      email: 'hello@example.com',
      tenantVerificationToken: null,
    }

    await new UseCaseValidateEmail(context).execute()

    expect(
      vi.mocked(tenantVerificationRepository.deletePendingByEmail),
    ).toHaveBeenCalledWith('hello@example.com')
    expect(context.tenantVerificationToken).toEqual(expect.any(String))
    expect(sendEmailViaSmtp).toHaveBeenCalled()
  })
})
