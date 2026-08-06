import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { StepCreateNewTenantVerification } from './StepCreateNewTenantVerification'

vi.mock('@/repositories/tenant-verification.repository', () => ({
  tenantVerificationRepository: {
    deletePendingByEmail: vi.fn(),
    create: vi.fn(),
  },
}))

describe('StepCreateNewTenantVerification', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a tenant verification and adds token to context', async () => {
    const context = {
      email: 'hello@example.com',
      tenantVerificationToken: null,
    }

    await new StepCreateNewTenantVerification().execute(context)

    expect(tenantVerificationRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'hello@example.com',
        tenantVerificationToken: expect.any(String),
        expiresAt: expect.any(Date),
      }),
    )

    expect(context.tenantVerificationToken).toEqual(expect.any(String))
  })
})
