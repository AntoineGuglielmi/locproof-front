import { StepCreateReference } from './StepCreateReference'
import { referenceRepository } from '@/repositories/reference.repository'
import { TypeContextWithFormInputAndRentalAndTenant } from '../../types/TypesSteps'
import { Rental, Tenant } from '@/shared/types/strapi-types'

vi.mock('@/repositories/reference.repository', () => ({
  referenceRepository: {
    create: vi.fn(),
  },
}))

describe('StepCreateReference', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates the reference', async () => {
    const rental = {
      documentId: 'rental-123',
      tenantDocumentId: 'tenant-123',
      state: 'pending',
    } as Rental

    const tenant = {
      documentId: 'tenant-123',
      email: 'tenant@test.com',
      slug: 'antoine-g',
      firstname: 'Antoine',
      lastname: 'G',
    } as Tenant

    const context: TypeContextWithFormInputAndRentalAndTenant = {
      formInput: {
        paidOnTime: 'yes',
        wellMaintained: 'no',
        communication: 'skip',
        recommended: 'yes',
        comment: 'Quelques commentaires',
      },
      rentalToken: 'rental-token',
      rental,
      tenant,
    }

    const step = new StepCreateReference()

    await step.execute(context)

    expect(referenceRepository.create).toHaveBeenCalledWith({
      paidOnTime: 'yes',
      wellMaintained: 'no',
      communication: 'skip',
      recommended: 'yes',
      comment: 'Quelques commentaires',
      rental,
      tenant,
    })
  })

  it('throws an error when reference creation fails', async () => {
    vi.mocked(referenceRepository.create).mockRejectedValue(
      new Error('Database error'),
    )

    const rental = {
      documentId: 'rental-123',
      tenantDocumentId: 'tenant-123',
      state: 'pending',
    } as Rental

    const tenant = {
      documentId: 'tenant-123',
      email: 'tenant@test.com',
      slug: 'antoine-g',
      firstname: 'Antoine',
      lastname: 'G',
    } as Tenant

    const context: TypeContextWithFormInputAndRentalAndTenant = {
      formInput: {
        paidOnTime: 'yes',
        wellMaintained: 'yes',
        communication: 'yes',
        recommended: 'yes',
        comment: '',
      },
      rentalToken: 'rental-token',
      rental,
      tenant,
    }

    const step = new StepCreateReference()

    await expect(step.execute(context)).rejects.toThrow(
      'Impossible de créer la référence',
    )
  })
})
