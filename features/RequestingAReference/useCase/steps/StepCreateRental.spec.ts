import { StepCreateRental } from './StepCreateRental'
import { rentalRepository } from '@/repositories/rental.repository'
import { TypeContextRequestingAReference } from '../../types/TypeContextRequestingAReference'
import { Rental } from '@/shared/types/strapi-types'

vi.mock('@/repositories/rental.repository', () => ({
  rentalRepository: {
    create: vi.fn(),
  },
}))

describe('StepCreateRental', () => {
  it('creates a rental from context data', async () => {
    const rental: Rental = {
      documentId: 'rental-123',
      address: '35 Rue Pelleport 33800 Bordeaux',
    }

    vi.mocked(rentalRepository.create).mockResolvedValue(rental)

    const context = {
      tenant: {
        documentId: 'mznfiqkamuvhfphskau3101f',
      },

      formInput: {
        address: '35 Rue Pelleport 33800 Bordeaux',
        startDate: '2026-07-31',
        endDate: '2026-08-29',
        landlordEmail: 'contact.antoine.guglielmi@gmail.com',
        cityPublic: 'Bordeaux',
      },
    } as TypeContextRequestingAReference

    await new StepCreateRental().execute(context)

    expect(rentalRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        address: '35 Rue Pelleport 33800 Bordeaux',
        startDate: '2026-07-31',
        endDate: '2026-08-29',
        landlordEmail: 'contact.antoine.guglielmi@gmail.com',
        tenantDocumentId: 'mznfiqkamuvhfphskau3101f',
        cityPublic: 'Bordeaux',
        rentalToken: expect.any(String),
        expiresAt: expect.any(Date),
      }),
    )

    expect(context.rental).toEqual(rental)
  })
})
