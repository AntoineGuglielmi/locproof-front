import { TypeContextWithEmail } from '../../types/TypesSteps'
import { StepSendRetrieveProfileMailToTenant } from './StepSendRetrieveProfileMailToTenant'

const { sendEmailViaSmtp, retrieveProfileEmailMock } = vi.hoisted(() => ({
  sendEmailViaSmtp: vi.fn(),
  retrieveProfileEmailMock: vi.fn(),
}))

vi.mock('@/features/Emails/lib/smtp', () => ({
  sendEmailViaSmtp: sendEmailViaSmtp,
}))

vi.mock('../../components/retrieve-profile-email', () => ({
  default: retrieveProfileEmailMock,
}))

describe('StepSendRetrieveProfileMailToTenant', () => {
  const step = new StepSendRetrieveProfileMailToTenant()

  beforeEach(() => {
    vi.clearAllMocks()
    delete process.env.SEND_TENANT_EMAIL
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('does not send an email when the tenant is missing', async () => {
    const context = {
      tenant: null,
    } as TypeContextWithEmail

    const promise = step.execute(context)

    await vi.advanceTimersByTimeAsync(5000)
    await promise

    expect(sendEmailViaSmtp).not.toHaveBeenCalled()
  })

  it('throws an error if the tenant has no email', async () => {
    const context: TypeContextWithEmail = {
      email: 'antoine@example.com',
      tenant: {
        documentId: 'tenant-document-id',
        firstname: 'Antoine',
        lastname: 'Guglielmi',
        email: undefined,
        slug: 'antoine-guglielmi',
      },
    }

    await expect(step.execute(context)).rejects.toThrow(
      "Le mail de locataire n'existe pas",
    )
  })

  it('does not send an email in test environment by default', async () => {
    const context = {
      email: 'tenant@example.com',
      tenant: {
        email: 'tenant@example.com',
        slug: 'john-doe',
      },
    } as TypeContextWithEmail

    await step.execute(context)

    expect(sendEmailViaSmtp).not.toHaveBeenCalled()
  })

  it('sends an email when SEND_RETRIEVE_PROFILE_EMAIL is enabled', async () => {
    process.env.SEND_RETRIEVE_PROFILE_EMAIL = 'true'

    retrieveProfileEmailMock.mockReturnValue('email-component')

    const context = {
      email: 'tenant@example.com',
      tenant: {
        email: 'tenant@example.com',
        slug: 'john-doe',
      },
    } as TypeContextWithEmail

    await step.execute(context)

    expect(retrieveProfileEmailMock).toHaveBeenCalledWith({
      href: `${process.env.NEXT_PUBLIC_APP_URL}/profile/john-doe`,
    })

    expect(sendEmailViaSmtp).toHaveBeenCalledWith({
      to: 'tenant@example.com',
      subject: 'Votre lien vers votre profil Locproof',
      react: 'email-component',
    })
  })

  it('throws an error when sending the email fails', async () => {
    process.env.SEND_RETRIEVE_PROFILE_EMAIL = 'true'

    sendEmailViaSmtp.mockRejectedValue(new Error('Resend error'))

    const context = {
      email: 'tenant@example.com',
      tenant: {
        email: 'tenant@example.com',
        slug: 'john-doe',
      },
    } as TypeContextWithEmail

    await expect(step.execute(context)).rejects.toThrow(
      "Impossible d'envoyer l'email au locataire",
    )
  })
})
