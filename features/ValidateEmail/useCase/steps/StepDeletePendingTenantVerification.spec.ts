import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { StepDeletePendingTenantVerification } from './StepDeletePendingTenantVerification'

vi.mock('@/repositories/tenant-verification.repository', () => ({
  tenantVerificationRepository: {
    deletePendingByEmail: vi.fn(),
  },
}))

describe('StepDeletePendingTenantVerification', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deletes pending tenant verification by email', async () => {
    const context = {
      email: 'hello@example.com',
    }

    await new StepDeletePendingTenantVerification().execute(context)

    expect(
      tenantVerificationRepository.deletePendingByEmail,
    ).toHaveBeenCalledWith('hello@example.com')
  })

  it('throws an error when deletion fails', async () => {
    vi.mocked(
      tenantVerificationRepository.deletePendingByEmail,
    ).mockRejectedValue(new Error('database error'))

    await expect(
      new StepDeletePendingTenantVerification().execute({
        email: 'hello@example.com',
      }),
    ).rejects.toThrow('Impossible de supprimer la vérification existante')
  })
})
