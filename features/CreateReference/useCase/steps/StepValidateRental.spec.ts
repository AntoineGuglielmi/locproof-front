import { StepValidateRental } from './StepValidateRental'
import { rentalRepository } from '@/repositories/rental.repository'
import { TypeContextWithFormInput } from '../../types/TypesSteps'

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

    const step = new StepValidateRental()

    await expect(step.execute(context)).rejects.toThrow(
      'Impossible de valider la location',
    )
  })
})
