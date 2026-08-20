import { StepSendEmailToLandlord } from './StepSendEmailToLandlord'
import { TypeContextWithFormuInputAndRental } from '../../types/TypesSteps'
import { sendEmailViaSmtp } from '@/features/Emails/lib/smtp'

vi.mock('@/features/Emails/lib/smtp', () => ({
  sendEmailViaSmtp: vi.fn(),
}))

describe('StepSendEmailToLandlord', () => {
  beforeEach(() => {
    process.env.SEND_LANDLORD_EMAIL = 'false'
    vi.clearAllMocks()
  })

  it('sends an email to the landlord', async () => {
    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
    process.env.SEND_LANDLORD_EMAIL = 'true'

    vi.mocked(sendEmailViaSmtp).mockResolvedValue(undefined)

    const context = {
      formInput: {
        landlordEmail: 'landlord@test.com',
      },
      rental: {
        rentalToken: 'rental-token-123',
      },
    } as TypeContextWithFormuInputAndRental

    await new StepSendEmailToLandlord().execute(context)

    expect(sendEmailViaSmtp).toHaveBeenCalledWith({
      to: 'landlord@test.com',
      subject:
        'Vous avez reçu une demande de recommandation de la part de votre ancien locataire',
      react: expect.anything(),
    })
  })

  it('does not send an email when sending is disabled', async () => {
    process.env.SEND_LANDLORD_EMAIL = 'false'

    const context = {
      formInput: {
        landlordEmail: 'landlord@test.com',
      },
      rental: {
        rentalToken: 'rental-token-123',
      },
    } as TypeContextWithFormuInputAndRental

    await new StepSendEmailToLandlord().execute(context)

    expect(sendEmailViaSmtp).not.toHaveBeenCalled()
  })

  it('throws an error when email sending fails', async () => {
    process.env.SEND_LANDLORD_EMAIL = 'true'

    vi.mocked(sendEmailViaSmtp).mockRejectedValue(new Error('Resend error'))

    const context = {
      formInput: {
        landlordEmail: 'landlord@test.com',
      },
      rental: {
        rentalToken: 'rental-token-123',
      },
    } as TypeContextWithFormuInputAndRental

    await expect(
      new StepSendEmailToLandlord().execute(context),
    ).rejects.toThrow("Impossible d'envoyer l'email au propriétaire")
  })
})
