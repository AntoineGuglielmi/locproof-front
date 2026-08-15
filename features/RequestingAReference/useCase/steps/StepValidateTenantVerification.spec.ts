import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { StepValidateTenantVerification } from './StepValidateTenantVerification'
import { TypeContextWithTenantVerification } from '../../types/TypesSteps'

vi.mock('@/repositories/tenant-verification.repository', () => ({
  tenantVerificationRepository: {
    markAsValidated: vi.fn(),
  },
}))

describe('StepValidateTenantVerification', () => {
  it('marks tenant verification as validated', async () => {
    const context = {
      tenantVerification: {
        documentId: 'verification-123',
      },
    } as TypeContextWithTenantVerification

    vi.mocked(tenantVerificationRepository.markAsValidated).mockResolvedValue(
      undefined,
    )

    await new StepValidateTenantVerification().execute(context)

    expect(tenantVerificationRepository.markAsValidated).toHaveBeenCalledWith(
      'verification-123',
    )
  })

  it('throws an error when validation fails', async () => {
    vi.mocked(tenantVerificationRepository.markAsValidated).mockRejectedValue(
      new Error('Database error'),
    )

    const context = {
      tenantVerification: {
        documentId: 'verification-123',
      },
    } as TypeContextWithTenantVerification

    await expect(
      new StepValidateTenantVerification().execute(context),
    ).rejects.toThrow('Impossible de valider la vérification')
  })
})
