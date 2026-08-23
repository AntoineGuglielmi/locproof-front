import { GET } from './route'
import { Rental, TenantVerification } from '@/shared/types/strapi-types'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { rentalRepository } from '@/repositories/rental.repository'

vi.mock('@/repositories/tenant-verification.repository', () => ({
  tenantVerificationRepository: {
    findTenantVerificationByToken: vi.fn(),
  },
}))

vi.mock('@/repositories/rental.repository', () => ({
  rentalRepository: {
    findByTenantVerificationToken: vi.fn(),
  },
}))

describe('GET /api/check-tenant-verification', () => {
  const appUrl = 'http://localhost:3000'

  const validTenantVerification: TenantVerification = {
    documentId: 'tenant-verification-123',
    tenantVerificationToken: 'tenant-verification-token',
    state: 'pending',
    expiresAt: new Date('2076-08-24'),
  }

  const expiredTenantVerification: TenantVerification = {
    documentId: 'tenant-verification-123',
    tenantVerificationToken: 'tenant-verification-token',
    state: 'pending',
    expiresAt: new Date('2016-08-24'),
  }

  const alreadyValidatedTenantVerification: TenantVerification = {
    documentId: 'tenant-verification-123',
    tenantVerificationToken: 'tenant-verification-token',
    state: 'validated',
    expiresAt: new Date('2076-08-24'),
  }

  const rental: Rental = {
    tenantVerification: validTenantVerification,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEXT_PUBLIC_APP_URL = appUrl
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const createRequest = (tenantVerificationToken?: string) => {
    const url = new URL('/api/check-tenant-verification', appUrl)

    if (tenantVerificationToken) {
      url.searchParams.set('tenantVerificationToken', tenantVerificationToken)
    }

    return new Request(url)
  }

  it('redirects to the request reference page when the tenant verification is valid', async () => {
    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue(validTenantVerification)
    vi.mocked(rentalRepository.findByTenantVerificationToken).mockResolvedValue(
      null,
    )
    const response = await GET(createRequest('tenant-verification-token'))
    expect(response.headers.get('location')).toBe(
      `${appUrl}/request-reference/tenant-verification-token`,
    )
  })

  it('redirects to the invalid link page when there is no tenant verification token', async () => {
    const response = await GET(createRequest())
    expect(response.headers.get('location')).toBe(
      `${appUrl}/error/invalid-link`,
    )
  })

  it('redirects to the invalid link page when there is no tenant verification', async () => {
    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue(null)
    const response = await GET(createRequest('tenant-verification-token'))
    expect(response.headers.get('location')).toBe(
      `${appUrl}/error/invalid-link`,
    )
  })

  it('redirects to the verification expired page when the tenant-verification has expired', async () => {
    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue(expiredTenantVerification)
    const response = await GET(createRequest('tenant-verification-token'))
    expect(response.headers.get('location')).toBe(
      `${appUrl}/error/verification-expired`,
    )
  })

  it('redirects to the already validated page when the tenant-verification has already been validated', async () => {
    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue(alreadyValidatedTenantVerification)
    const response = await GET(createRequest('tenant-verification-token'))
    expect(response.headers.get('location')).toBe(
      `${appUrl}/error/verification-already-validated`,
    )
  })

  it('redirects to the already validated page when the tenant-verification is pending but a rental exists', async () => {
    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue(validTenantVerification)
    vi.mocked(rentalRepository.findByTenantVerificationToken).mockResolvedValue(
      rental,
    )
    const response = await GET(createRequest('tenant-verification-token'))
    expect(response.headers.get('location')).toBe(
      `${appUrl}/error/verification-already-validated`,
    )
  })

  it('redirects to the unavailable page when an unexpected error occurs', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockRejectedValue(new Error('Unexpected error'))
    const response = await GET(createRequest('tenant-verification-token'))
    expect(response.headers.get('location')).toBe(`${appUrl}/error/unavailable`)
  })
})
