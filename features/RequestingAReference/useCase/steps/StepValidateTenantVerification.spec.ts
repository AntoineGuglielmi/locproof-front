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
})
