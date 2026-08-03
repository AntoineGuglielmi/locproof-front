import { StepGetTenantVerification } from './StepGetTenantVerification'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { TenantVerification } from '@/shared/types/strapi-types'
import { TypeContextWithFormInput } from '../../types/TypesSteps'

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
    } as TypeContextWithFormInput

    await new StepGetTenantVerification().execute(context)

    expect(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).toHaveBeenCalledWith('abc-token')

    expect(context.tenantVerification).toEqual(tenantVerification)
  })
})
