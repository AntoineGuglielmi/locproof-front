import { StepCreateReference } from './StepCreateReference'
import { referenceRepository } from '@/repositories/reference.repository'
import { TypeContextWithFormInput } from '../../types/TypesSteps'

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
    const context: TypeContextWithFormInput = {
      formInput: {
        paidOnTime: 'yes',
        wellMaintained: 'no',
        communication: 'skip',
        recommended: 'yes',
        comment: 'Quelques commentaires',
        rentalDocumentId: 'rental-document-id',
      },
      rental: null,
      tenant: null,
    }

    const step = new StepCreateReference()

    await step.execute(context)

    expect(referenceRepository.create).toHaveBeenCalledWith({
      paidOnTime: 'yes',
      wellMaintained: 'no',
      communication: 'skip',
      recommended: 'yes',
      comment: 'Quelques commentaires',
      rentalDocumentId: 'rental-document-id',
    })
  })

  it('throws an error when reference creation fails', async () => {
    vi.mocked(referenceRepository.create).mockRejectedValue(
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

    const step = new StepCreateReference()

    await expect(step.execute(context)).rejects.toThrow(
      'Impossible de créer la référence',
    )
  })
})
