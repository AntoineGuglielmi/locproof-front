import { tenantRepository } from '@/repositories/tenant.repository'
import { Tenant } from '@/shared/types/strapi-types'
import { TypeContextRetrieveProfile } from '../types/TypeContextRetrieveProfile'
import { UseCaseRetrieveProfile } from './UseCaseRetrieveProfile'
import { sendEmailViaSmtp } from '@/features/Emails/lib/smtp'

vi.mock('@/repositories/tenant.repository', () => ({
  tenantRepository: {
    findByEmail: vi.fn(),
  },
}))

vi.mock('@/features/Emails/lib/smtp', () => ({
  sendEmailViaSmtp: vi.fn(),
}))

describe('UseCaseRetrieveProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('completes a retrieve profile workflow when tenant has an exiting profile', async () => {
    process.env.SEND_RETRIEVE_PROFILE_EMAIL = 'true'

    const tenant = {
      documentId: 'tenant-123',
      email: 'tenant@test.com',
      slug: 'antoine-g',
      firstname: 'Antoine',
      lastname: 'G',
    } as Tenant

    vi.mocked(tenantRepository.findByEmail).mockResolvedValue(tenant)
    vi.mocked(sendEmailViaSmtp).mockResolvedValue(undefined)

    const context: TypeContextRetrieveProfile = {
      email: 'tenant@test.com',
      tenant: null,
    }

    await new UseCaseRetrieveProfile(context).execute()

    expect(context.tenant).toEqual(tenant)

    expect(tenantRepository.findByEmail).toHaveBeenCalledWith('tenant@test.com')

    expect(sendEmailViaSmtp).toHaveBeenCalled()
  })

  it('completes a retrieve profile workflow when tenant has not exiting profile', async () => {
    vi.mocked(tenantRepository.findByEmail).mockResolvedValue(null)
    vi.mocked(sendEmailViaSmtp).mockResolvedValue(undefined)

    const context: TypeContextRetrieveProfile = {
      email: 'tenant@test.com',
      tenant: null,
    }

    const promise = new UseCaseRetrieveProfile(context).execute()
    await vi.advanceTimersByTimeAsync(5000)
    await promise

    expect(context.tenant).toEqual(null)

    expect(tenantRepository.findByEmail).toHaveBeenCalledWith('tenant@test.com')

    expect(sendEmailViaSmtp).not.toHaveBeenCalled()
  })
})
