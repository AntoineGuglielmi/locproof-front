import { ServiceGetPageContext } from './ServiceGetPageContext'
import { rentalRepository } from '@/repositories/rental.repository'
import { tenantRepository } from '@/repositories/tenant.repository'
import { Rental, Tenant } from '@/shared/types/strapi-types'

vi.mock('@/repositories/rental.repository', () => ({
  rentalRepository: {
    findByRentalToken: vi.fn(),
  },
}))

vi.mock('@/repositories/tenant.repository', () => ({
  tenantRepository: {
    findBydDocumentId: vi.fn(),
  },
}))

describe('ServiceGetPageContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns not-found when rental does not exist', async () => {
    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(null)

    const result = await ServiceGetPageContext('rental-token')

    expect(result).toEqual({
      status: 'not-found',
    })

    expect(rentalRepository.findByRentalToken).toHaveBeenCalledWith(
      'rental-token',
    )

    expect(tenantRepository.findBydDocumentId).not.toHaveBeenCalled()
  })

  it('returns expired when rental has expired', async () => {
    const rental: Rental = {
      documentId: 'rental-document-id',
      rentalToken: 'rental-token',
      expiresAt: new Date('2020-01-01'),
      state: 'pending',
    }

    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(rental)

    const result = await ServiceGetPageContext('rental-token')

    expect(result).toEqual({
      status: 'expired',
    })

    expect(tenantRepository.findBydDocumentId).not.toHaveBeenCalled()
  })

  it('returns validated when rental has already been validated', async () => {
    const rental: Rental = {
      documentId: 'rental-document-id',
      rentalToken: 'rental-token',
      expiresAt: new Date('2099-01-01'),
      state: 'validated',
    }

    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(rental)

    const result = await ServiceGetPageContext('rental-token')

    expect(result).toEqual({
      status: 'validated',
    })

    expect(tenantRepository.findBydDocumentId).not.toHaveBeenCalled()
  })

  it('returns tenant-not-found when tenant does not exist', async () => {
    const rental: Rental = {
      documentId: 'rental-document-id',
      rentalToken: 'rental-token',
      expiresAt: new Date('2099-01-01'),
      state: 'pending',
      tenant: undefined,
    }

    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(rental)

    const result = await ServiceGetPageContext('rental-token')

    expect(result).toEqual({
      status: 'tenant-not-found',
    })
  })

  it('returns ready with rental and tenant', async () => {
    const tenant: Tenant = {
      documentId: 'tenant-document-id',
      firstname: 'Antoine',
      lastname: 'Guglielmi',
      email: 'antoine@example.com',
    }

    const rental: Rental = {
      documentId: 'rental-document-id',
      rentalToken: 'rental-token',
      expiresAt: new Date('2099-01-01'),
      state: 'pending',
      tenant,
    }

    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(rental)

    const result = await ServiceGetPageContext('rental-token')

    expect(result).toEqual({
      status: 'ready',
      rental,
      tenant,
    })

    expect(rentalRepository.findByRentalToken).toHaveBeenCalledWith(
      'rental-token',
    )
  })
})
