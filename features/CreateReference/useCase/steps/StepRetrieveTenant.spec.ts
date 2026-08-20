import { StepRetrieveTenant } from './StepRetrieveTenant'
import { tenantRepository } from '@/repositories/tenant.repository'
import { Tenant } from '@/shared/types/strapi-types'
import { TypeContextWithRental } from '../../types/TypesSteps'

vi.mock('@/repositories/tenant.repository', () => ({
  tenantRepository: {
    findBydDocumentId: vi.fn(),
  },
}))

describe('StepRetrieveTenant', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('retrieves the tenant and adds it to the context', async () => {
    const tenant: Tenant = {
      documentId: 'tenant-document-id',
      firstname: 'Antoine',
      lastname: 'Guglielmi',
      email: 'antoine@example.com',
      slug: 'antoine-guglielmi',
    }

    vi.mocked(tenantRepository.findBydDocumentId).mockResolvedValue(tenant)

    const context: TypeContextWithRental = {
      formInput: {
        paidOnTime: 'yes',
        wellMaintained: 'yes',
        communication: 'yes',
        recommended: 'yes',
        comment: '',
      },
      rental: {
        documentId: 'rental-document-id',
        tenantDocumentId: 'tenant-document-id',
      },
      tenant: null,
    }

    const step = new StepRetrieveTenant()

    await step.execute(context)

    expect(tenantRepository.findBydDocumentId).toHaveBeenCalledWith(
      'tenant-document-id',
    )

    expect(context.tenant).toEqual(tenant)
  })

  it('throws an error when tenant retrieval fails', async () => {
    vi.mocked(tenantRepository.findBydDocumentId).mockRejectedValue(
      new Error('Database error'),
    )

    const context: TypeContextWithRental = {
      formInput: {
        paidOnTime: 'yes',
        wellMaintained: 'yes',
        communication: 'yes',
        recommended: 'yes',
        comment: '',
      },
      rental: {
        documentId: 'rental-document-id',
        tenantDocumentId: 'tenant-document-id',
      },
      tenant: null,
    }

    const step = new StepRetrieveTenant()

    await expect(step.execute(context)).rejects.toThrow(
      'Impossible de récupérer le locataire',
    )
  })
})
