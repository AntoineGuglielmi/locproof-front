import { UseCaseCheckRental } from './UseCaseCheckRental'
import { rentalRepository } from '@/repositories/rental.repository'
import { referenceRepository } from '@/repositories/reference.repository'
import { Rental, Reference } from '@/shared/types/strapi-types'
import { TypeContextCheckRental } from '../types/TypeContextCheckRental'

vi.mock('@/repositories/rental.repository', () => ({
  rentalRepository: {
    findByRentalToken: vi.fn(),
  },
}))

vi.mock('@/repositories/reference.repository', () => ({
  referenceRepository: {
    findByRentalDocumentId: vi.fn(),
  },
}))

describe('UseCaseCheckRental', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should throw an error when the rental token is missing', async () => {
    const context: TypeContextCheckRental = {
      rentalToken: null,
    }

    const useCase = new UseCaseCheckRental(context)

    await expect(useCase.execute()).rejects.toThrow(
      'Le lien que vous avez utilisé est invalide.',
    )

    expect(context.result).toBe('no-rental-token')

    expect(rentalRepository.findByRentalToken).not.toHaveBeenCalled()
    expect(referenceRepository.findByRentalDocumentId).not.toHaveBeenCalled()
  })

  it('should throw an error when the rental cannot be found', async () => {
    const rentalToken = 'rental-token'

    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(null)

    const context: TypeContextCheckRental = {
      rentalToken,
    }

    const useCase = new UseCaseCheckRental(context)

    await expect(useCase.execute()).rejects.toThrow('Location introuvable')

    expect(context.result).toBe('no-rental')

    expect(rentalRepository.findByRentalToken).toHaveBeenCalledWith(rentalToken)

    expect(referenceRepository.findByRentalDocumentId).not.toHaveBeenCalled()
  })

  it('should throw an error when the rental has expired', async () => {
    const rental = {
      documentId: 'rental-document-id',
      rentalToken: 'rental-token',
      expiresAt: new Date('2020-01-01'),
      state: 'pending',
    } satisfies Rental

    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(rental)

    const context: TypeContextCheckRental = {
      rentalToken: rental.rentalToken,
    }

    const useCase = new UseCaseCheckRental(context)

    await expect(useCase.execute()).rejects.toThrow(
      'La demande de référence a expiré',
    )

    expect(context.result).toBe('rental-expired')

    expect(rentalRepository.findByRentalToken).toHaveBeenCalledWith(
      rental.rentalToken,
    )

    expect(referenceRepository.findByRentalDocumentId).not.toHaveBeenCalled()
  })

  it('should throw an error when the rental has already been validated', async () => {
    const rental = {
      documentId: 'rental-document-id',
      rentalToken: 'rental-token',
      expiresAt: new Date('2099-01-01'),
      state: 'validated',
    } satisfies Rental

    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(rental)

    const context: TypeContextCheckRental = {
      rentalToken: rental.rentalToken,
    }

    const useCase = new UseCaseCheckRental(context)

    await expect(useCase.execute()).rejects.toThrow(
      'Cette demande de référence a déjà été traitée',
    )

    expect(context.result).toBe('rental-already-validated')

    expect(rentalRepository.findByRentalToken).toHaveBeenCalledWith(
      rental.rentalToken,
    )

    expect(referenceRepository.findByRentalDocumentId).not.toHaveBeenCalled()
  })

  it('should throw an error when a reference already exists for the rental', async () => {
    const rental = {
      documentId: 'rental-document-id',
      rentalToken: 'rental-token',
      expiresAt: new Date('2099-01-01'),
      state: 'pending',
    } satisfies Rental

    const reference = {
      documentId: 'reference-document-id',
      rental: rental,
    } satisfies Reference

    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(rental)
    vi.mocked(referenceRepository.findByRentalDocumentId).mockResolvedValue(
      reference,
    )

    const context: TypeContextCheckRental = {
      rentalToken: rental.rentalToken,
    }

    const useCase = new UseCaseCheckRental(context)

    await expect(useCase.execute()).rejects.toThrow(
      'Cette demande de référence a déjà été traitée',
    )

    expect(context.result).toBe('rental-already-validated')

    expect(referenceRepository.findByRentalDocumentId).toHaveBeenCalledWith(
      rental.documentId,
    )
  })

  it('should complete successfully when the rental can be checked', async () => {
    const rental = {
      documentId: 'rental-document-id',
      rentalToken: 'rental-token',
      expiresAt: new Date('2099-01-01'),
      state: 'pending',
    } satisfies Rental

    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(rental)
    vi.mocked(referenceRepository.findByRentalDocumentId).mockResolvedValue(
      null,
    )

    const context: TypeContextCheckRental = {
      rentalToken: rental.rentalToken,
    }

    const useCase = new UseCaseCheckRental(context)

    await expect(useCase.execute()).resolves.toBeUndefined()

    expect(context.rental).toEqual(rental)
    expect(context.result).toBeUndefined()

    expect(rentalRepository.findByRentalToken).toHaveBeenCalledWith(
      rental.rentalToken,
    )

    expect(referenceRepository.findByRentalDocumentId).toHaveBeenCalledWith(
      rental.documentId,
    )
  })

  it('fails when unknown error pops from reference repo', async () => {
    vi.mocked(referenceRepository.findByRentalDocumentId).mockRejectedValue(
      new Error('Unexpected error'),
    )

    const context: TypeContextCheckRental = {
      rentalToken: 'rental-token',
    }

    const useCase = new UseCaseCheckRental(context)

    await expect(useCase.execute()).rejects.toThrow(
      'Impossible de récupérer la référence',
    )
  })
})
