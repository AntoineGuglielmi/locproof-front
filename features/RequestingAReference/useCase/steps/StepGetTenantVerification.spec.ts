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

  it('throws an error when tenant verification cannot be retrieved', async () => {
    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockRejectedValue(new Error('Database error'))

    const context = {
      formInput: {
        tenantVerificationToken: 'abc-token',
      },
    } as TypeContextWithFormInput

    await expect(
      new StepGetTenantVerification().execute(context),
    ).rejects.toThrow(
      'Impossible de récupérer le token de la vérification existante',
    )
  })
})
