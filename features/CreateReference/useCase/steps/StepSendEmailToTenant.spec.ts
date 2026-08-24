import { beforeEach, describe, expect, it, vi } from 'vitest'
import { StepSendEmailToTenant } from './StepSendEmailToTenant'
import { TypeContextWithRental } from '../../types/TypesSteps'

const { sendEmailViaSmtp, newReferenceEmailMock } = vi.hoisted(() => ({
  sendEmailViaSmtp: vi.fn(),
  newReferenceEmailMock: vi.fn(),
}))

vi.mock('@/features/Emails/lib/smtp', () => ({
  sendEmailViaSmtp: sendEmailViaSmtp,
}))

vi.mock('../../components/new-reference-email', () => ({
  default: newReferenceEmailMock,
}))

describe('StepSendEmailToTenant', () => {
  const step = new StepSendEmailToTenant()

  beforeEach(() => {
    vi.clearAllMocks()
    delete process.env.SEND_TENANT_EMAIL
  })

  it('does not send an email when the tenant email is missing', async () => {
    const context = {
      rental: {
        tenant: {
          slug: 'john-doe',
        },
      },
    } as TypeContextWithRental

    await step.execute(context)

    expect(sendEmailViaSmtp).not.toHaveBeenCalled()
  })

  it('does not send an email when the tenant slug is missing', async () => {
    const context = {
      rental: {
        tenant: {
          email: 'tenant@example.com',
        },
      },
    } as TypeContextWithRental

    await step.execute(context)

    expect(sendEmailViaSmtp).not.toHaveBeenCalled()
  })

  it('does not send an email in test environment by default', async () => {
    const context = {
      rental: {
        tenant: {
          email: 'tenant@example.com',
          slug: 'john-doe',
        },
      },
    } as TypeContextWithRental

    await step.execute(context)

    expect(sendEmailViaSmtp).not.toHaveBeenCalled()
  })

  it('sends an email when SEND_TENANT_EMAIL is enabled', async () => {
    process.env.SEND_TENANT_EMAIL = 'true'

    newReferenceEmailMock.mockReturnValue('email-component')

    const context = {
      rental: {
        tenant: {
          email: 'tenant@example.com',
          slug: 'john-doe',
        },
      },
    } as TypeContextWithRental

    await step.execute(context)

    expect(newReferenceEmailMock).toHaveBeenCalledWith({
      href: `${process.env.NEXT_PUBLIC_APP_URL}/profile/john-doe`,
    })

    expect(sendEmailViaSmtp).toHaveBeenCalledWith({
      to: 'tenant@example.com',
      subject: 'Votre recommandation a été rédigée !',
      react: 'email-component',
    })
  })

  it('throws an error when sending the email fails', async () => {
    process.env.SEND_TENANT_EMAIL = 'true'

    sendEmailViaSmtp.mockRejectedValue(new Error('Resend error'))

    const context = {
      rental: {
        tenant: {
          email: 'tenant@example.com',
          slug: 'john-doe',
        },
      },
    } as TypeContextWithRental

    await expect(step.execute(context)).rejects.toThrow(
      "Impossible d'envoyer l'email au locataire",
    )
  })
})
