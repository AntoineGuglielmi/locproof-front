import { StepSendEmailToLandlord } from './StepSendEmailToLandlord'
import { sendEmailViaResend } from '@/features/Emails/lib/resend'
import { TypeContextWithFormuInputAndRental } from '../../types/TypesSteps'

vi.mock('@/features/Emails/lib/resend', () => ({
  sendEmailViaResend: vi.fn(),
}))

describe('StepSendEmailToLandlord', () => {
  it('sends an email to the landlord', async () => {
    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'

    vi.mocked(sendEmailViaResend).mockResolvedValue(undefined)

    const context = {
      formInput: {
        landlordEmail: 'landlord@test.com',
      },
      rental: {
        rentalToken: 'rental-token-123',
      },
    } as TypeContextWithFormuInputAndRental

    await new StepSendEmailToLandlord().execute(context)

    expect(sendEmailViaResend).toHaveBeenCalledWith({
      from: 'LocProof <hello@locproof.fr>',
      to: 'landlord@test.com',
      subject:
        'Vous avez reçu une demande de recommandation de la part de votre ancien locataire',
      react: expect.anything(),
    })
  })
})
