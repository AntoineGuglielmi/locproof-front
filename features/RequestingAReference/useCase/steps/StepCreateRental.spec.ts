import { StepCreateRental } from './StepCreateRental'
import { rentalRepository } from '@/repositories/rental.repository'
import { Rental } from '@/shared/types/strapi-types'
import { TypeContextWithFormInputAndTenantAndTenantVerification } from '../../types/TypesSteps'

vi.mock('@/repositories/rental.repository', () => ({
  rentalRepository: {
    create: vi.fn(),
    findOverlappingRental: vi.fn(),
  },
}))

describe('StepCreateRental', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(rentalRepository.findOverlappingRental).mockResolvedValue(null)
  })

  it('creates a rental from context data', async () => {
    const rental: Rental = {
      documentId: 'rental-123',
      address: '35 Rue Pelleport 33800 Bordeaux',
    }

    vi.mocked(rentalRepository.create).mockResolvedValue(rental)

    const context = {
      tenant: {
        documentId: 'tenant-123',
      },

      formInput: {
        address: {
          label: '35 Rue Pelleport 33800 Bordeaux',
          city: 'Bordeaux',
        },
        startDate: '2026-07-31',
        endDate: '2026-08-29',
        landlordEmail: 'landlord@test.com',
      },
      tenantVerification: {
        documentId: 'tenantVerification-123',
      },
    } as TypeContextWithFormInputAndTenantAndTenantVerification

    await new StepCreateRental().execute(context)

    expect(rentalRepository.findOverlappingRental).toHaveBeenCalledWith({
      tenant: {
        documentId: 'tenant-123',
      },
      startDate: '2026-07-31',
      endDate: '2026-08-29',
    })

    expect(rentalRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        address: '35 Rue Pelleport 33800 Bordeaux',
        startDate: '2026-07-31',
        endDate: '2026-08-29',
        landlordEmail: 'landlord@test.com',
        tenant: {
          documentId: 'tenant-123',
        },
        cityPublic: 'Bordeaux',
        rentalToken: expect.any(String),
        expiresAt: expect.any(Date),
        tenantVerification: {
          documentId: 'tenantVerification-123',
        },
      }),
    )

    expect(context.rental).toEqual(rental)
  })

  it('rejects creation when an overlapping rental already exists', async () => {
    const overlappingRental: Rental = {
      documentId: 'rental-existing',
      tenant: {
        documentId: 'tenant-123',
      },
      tenantVerification: {
        documentId: 'tenantVerification-123',
      },
      startDate: '2026-07-01',
      endDate: '2026-08-15',
    }

    vi.mocked(rentalRepository.findOverlappingRental).mockResolvedValue(
      overlappingRental,
    )

    const context = {
      tenant: {
        documentId: 'tenant-123',
      },
      formInput: {
        address: {
          label: '35 Rue Pelleport 33800 Bordeaux',
          city: 'Bordeaux',
        },
        startDate: '2026-07-31',
        endDate: '2026-08-29',
        landlordEmail: 'landlord@test.com',
      },
      tenantVerification: {
        documentId: 'tenantVerification-123',
      },
    } as TypeContextWithFormInputAndTenantAndTenantVerification

    await expect(new StepCreateRental().execute(context)).rejects.toThrow(
      'Ce locataire possède déjà une location sur cette période.',
    )

    expect(rentalRepository.create).not.toHaveBeenCalled()
  })

  it('throws an error when rental creation fails', async () => {
    vi.mocked(rentalRepository.create).mockRejectedValue(
      new Error('Database error'),
    )

    const context = {
      tenant: {
        documentId: 'tenant-123',
      },
      formInput: {
        address: {
          label: '35 Rue Pelleport 33800 Bordeaux',
          city: 'Bordeaux',
        },
        startDate: '2026-07-31',
        endDate: '2026-08-29',
        landlordEmail: 'landlord@test.com',
      },
      tenantVerification: {
        documentId: 'tenantVerification-123',
      },
    } as TypeContextWithFormInputAndTenantAndTenantVerification

    await expect(new StepCreateRental().execute(context)).rejects.toThrow(
      'Impossible de créer la location',
    )

    expect(rentalRepository.findOverlappingRental).toHaveBeenCalled()
  })
})
