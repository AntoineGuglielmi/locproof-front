import { StepRetrieveRental } from './StepRetrieveRental'
import { rentalRepository } from '@/repositories/rental.repository'
import { Rental } from '@/shared/types/strapi-types'
import { TypeContextWithFormInput } from '../../types/TypesSteps'

vi.mock('@/repositories/rental.repository', () => ({
  rentalRepository: {
    findByDocumentId: vi.fn(),
  },
}))

describe('StepRetrieveRental', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('retrieves the rental and adds it to the context', async () => {
    const rental: Rental = {
      documentId: 'rental-document-id',
      rentalToken: 'rental-token',
      tenantDocumentId: 'tenant-document-id',
      state: 'pending',
    }

    vi.mocked(rentalRepository.findByDocumentId).mockResolvedValue(rental)

    const context: TypeContextWithFormInput = {
      formInput: {
        paidOnTime: 'yes',
        wellMaintained: 'yes',
        communication: 'yes',
        recommended: 'yes',
        comment: '',
        rentalDocumentId: 'rental-document-id',
      },
      rental: null,
      tenant: null,
    }

    const step = new StepRetrieveRental()

    await step.execute(context)

    expect(rentalRepository.findByDocumentId).toHaveBeenCalledWith(
      'rental-document-id',
    )

    expect(context.rental).toEqual(rental)
  })

  it('throws an error when rental retrieval fails', async () => {
    vi.mocked(rentalRepository.findByDocumentId).mockRejectedValue(
      new Error('Database error'),
    )

    const context: TypeContextWithFormInput = {
      formInput: {
        paidOnTime: 'yes',
        wellMaintained: 'yes',
        communication: 'yes',
        recommended: 'yes',
        comment: '',
        rentalDocumentId: 'rental-document-id',
      },
      rental: null,
      tenant: null,
    }

    const step = new StepRetrieveRental()

    await expect(step.execute(context)).rejects.toThrow(
      'Impossible de récupérer la location',
    )
  })
})
