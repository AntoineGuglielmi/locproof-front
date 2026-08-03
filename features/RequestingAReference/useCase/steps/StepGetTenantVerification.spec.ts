import { StepGetTenantVerification } from './StepGetTenantVerification'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { TypeContextRequestingAReference } from '../../types/TypeContextRequestingAReference'
import { TenantVerification } from '@/shared/types/strapi-types'

vi.mock('@/repositories/tenant-verification.repository', () => ({
  tenantVerificationRepository: {
    findTenantVerificationByToken: vi.fn(),
  },
}))

describe('StepGetTenantVerification', () => {
  it('gets tenant verification from token', async () => {
    const tenantVerification: TenantVerification = {
      documentId: 'verification-123',
      tenantVerificationToken: 'abc-token',
    }

    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue(tenantVerification)

    const context = {
      formInput: {
        tenantVerificationToken: 'abc-token',
      },
    } as TypeContextRequestingAReference

    await new StepGetTenantVerification().execute(context)

    expect(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).toHaveBeenCalledWith('abc-token')

    expect(context.tenantVerification).toEqual(tenantVerification)
  })
})
