import { GET } from './route'
import { rentalRepository } from '@/repositories/rental.repository'
import { Reference, Rental, Tenant } from '@/shared/types/strapi-types'
import { referenceRepository } from '@/repositories/reference.repository'

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

describe('GET /api/check-rental', () => {
  const appUrl = 'http://localhost:3000'

  const tenant: Tenant = {
    documentId: 'tenant-123',
    email: 'tenant@test.com',
    slug: 'antoine-g',
    firstname: 'Antoine',
    lastname: 'G',
  }

  const validRental: Rental = {
    documentId: 'rental-123',
    tenant,
    state: 'pending',
    expiresAt: new Date('2076-08-24'),
  }

  const expiredRental: Rental = {
    documentId: 'rental-123',
    tenant,
    state: 'pending',
    expiresAt: new Date('2026-08-20'),
  }

  const alreadyValidatedRental: Rental = {
    documentId: 'rental-123',
    tenant,
    state: 'validated',
    expiresAt: new Date('2076-08-25'),
  }

  const reference: Reference = {
    tenant,
    rental: validRental,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEXT_PUBLIC_APP_URL = appUrl
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const createRequest = (rentalToken?: string) => {
    const url = new URL('/api/check-rental', appUrl)

    if (rentalToken) {
      url.searchParams.set('rentalToken', rentalToken)
    }

    return new Request(url)
  }

  it('redirects to the create reference page when the rental is valid', async () => {
    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(validRental)
    vi.mocked(referenceRepository.findByRentalDocumentId).mockResolvedValue(
      null,
    )

    const response = await GET(createRequest('rental-token'))
    expect(response.headers.get('location')).toBe(
      `${appUrl}/create-reference/rental-token`,
    )
  })

  it('redirects to the invalid link page when there is no rental token', async () => {
    const response = await GET(createRequest())
    expect(response.headers.get('location')).toBe(
      `${appUrl}/error/invalid-link`,
    )
  })

  it('redirects to the invalid link page when there is no rental', async () => {
    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(null)

    const response = await GET(createRequest('rental-token'))
    expect(response.headers.get('location')).toBe(
      `${appUrl}/error/invalid-link`,
    )
  })

  it('redirects to the rental expired page when the rental has expired', async () => {
    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(
      expiredRental,
    )

    const response = await GET(createRequest('rental-token'))
    expect(response.headers.get('location')).toBe(
      `${appUrl}/error/rental-expired`,
    )
  })

  it('redirects to the already validated page when the rental has already been validated', async () => {
    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(
      alreadyValidatedRental,
    )

    const response = await GET(createRequest('rental-token'))
    expect(response.headers.get('location')).toBe(
      `${appUrl}/error/rental-already-validated`,
    )
  })

  it('redirects to the already validated page when the rental is pending but a reference exists', async () => {
    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(validRental)
    vi.mocked(referenceRepository.findByRentalDocumentId).mockResolvedValue(
      reference,
    )

    const response = await GET(createRequest('rental-token'))
    expect(response.headers.get('location')).toBe(
      `${appUrl}/error/rental-already-validated`,
    )
  })

  it('redirects to the unavailable page when an unexpected error occurs', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.mocked(rentalRepository.findByRentalToken).mockRejectedValue(
      new Error('Unexpected error'),
    )

    const response = await GET(createRequest('rental-token'))

    expect(response.headers.get('location')).toBe(`${appUrl}/error/unavailable`)
  })
})
