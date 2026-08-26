import { StepValidateRental } from './StepValidateRental'
import { rentalRepository } from '@/repositories/rental.repository'
import { TypeContextWithRental } from '../../types/TypesSteps'
import { Rental } from '@/shared/types/strapi-types'

vi.mock('@/repositories/rental.repository', () => ({
  rentalRepository: {
    markAsValidated: vi.fn(),
  },
}))

describe('StepValidateRental', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('validates the rental', async () => {
    const rental: Rental = {
      documentId: 'rental-document-id',
      rentalToken: 'rental-token',
      tenantDocumentId: 'tenant-document-id',
      state: 'pending',
    }

    const context: TypeContextWithRental = {
      formInput: {
        paidOnTime: 'yes',
        wellMaintained: 'yes',
        communication: 'yes',
        recommended: 'yes',
        comment: '',
      },
      rentalToken: 'rental-token',
      rental,
      tenant: null,
    }

    const step = new StepValidateRental()

    await step.execute(context)

    expect(rentalRepository.markAsValidated).toHaveBeenCalledWith(
      'rental-document-id',
    )
  })

  it('throws an error when rental validation fails', async () => {
    vi.mocked(rentalRepository.markAsValidated).mockRejectedValue(
      new Error('Database error'),
    )

    const rental: Rental = {
      documentId: 'rental-document-id',
      rentalToken: 'rental-token',
      tenantDocumentId: 'tenant-document-id',
      state: 'pending',
    }

    const context: TypeContextWithRental = {
      formInput: {
        paidOnTime: 'yes',
        wellMaintained: 'yes',
        communication: 'yes',
        recommended: 'yes',
        comment: '',
      },
      rentalToken: 'rental-token',
      rental,
      tenant: null,
    }

    const step = new StepValidateRental()

    await expect(step.execute(context)).rejects.toThrow(
      'Impossible de valider la location',
    )
  })
})
