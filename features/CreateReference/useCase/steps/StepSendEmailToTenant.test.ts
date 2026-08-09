import { beforeEach, describe, expect, it, vi } from 'vitest'
import { StepSendEmailToTenant } from './StepSendEmailToTenant'
import { TypeContextWithTenant } from '../../types/TypesSteps'

const { sendEmailViaResendMock, newReferenceEmailMock } = vi.hoisted(() => ({
  sendEmailViaResendMock: vi.fn(),
  newReferenceEmailMock: vi.fn(),
}))

vi.mock('@/features/Emails/lib/resend', () => ({
  sendEmailViaResend: sendEmailViaResendMock,
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
      tenant: {
        slug: 'john-doe',
      },
    } as TypeContextWithTenant

    await step.execute(context)

    expect(sendEmailViaResendMock).not.toHaveBeenCalled()
  })

  it('does not send an email when the tenant slug is missing', async () => {
    const context = {
      tenant: {
        email: 'tenant@example.com',
      },
    } as TypeContextWithTenant

    await step.execute(context)

    expect(sendEmailViaResendMock).not.toHaveBeenCalled()
  })

  it('does not send an email in test environment by default', async () => {
    const context = {
      tenant: {
        email: 'tenant@example.com',
        slug: 'john-doe',
      },
    } as TypeContextWithTenant

    await step.execute(context)

    expect(sendEmailViaResendMock).not.toHaveBeenCalled()
  })

  it('sends an email when SEND_TENANT_EMAIL is enabled', async () => {
    process.env.SEND_TENANT_EMAIL = 'true'

    newReferenceEmailMock.mockReturnValue('email-component')

    const context = {
      tenant: {
        email: 'tenant@example.com',
        slug: 'john-doe',
      },
    } as TypeContextWithTenant

    await step.execute(context)

    expect(newReferenceEmailMock).toHaveBeenCalledWith({
      href: `${process.env.NEXT_PUBLIC_APP_URL}/profile/john-doe`,
    })

    expect(sendEmailViaResendMock).toHaveBeenCalledWith({
      from: 'LocProof <hello@locproof.fr>',
      to: 'tenant@example.com',
      subject: 'Votre recommandation a été rédigée !',
      react: 'email-component',
    })
  })

  it('throws an error when sending the email fails', async () => {
    process.env.SEND_TENANT_EMAIL = 'true'

    sendEmailViaResendMock.mockRejectedValue(new Error('Resend error'))

    const context = {
      tenant: {
        email: 'tenant@example.com',
        slug: 'john-doe',
      },
    } as TypeContextWithTenant

    await expect(step.execute(context)).rejects.toThrow(
      "Impossible d'envoyer l'email au locataire",
    )
  })
})
