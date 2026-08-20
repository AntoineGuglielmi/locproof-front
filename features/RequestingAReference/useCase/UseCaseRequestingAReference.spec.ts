import { UseCaseRequestingAReference } from './UseCaseRequestingAReference'
import { ServiceCreateTenant } from '../services/ServiceCreateTenant'
import { rentalRepository } from '@/repositories/rental.repository'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { sendEmailViaSmtp } from '@/features/Emails/lib/smtp'
import { Rental, Tenant, TenantVerification } from '@/shared/types/strapi-types'
import { TypeContextRequestingAReference } from '../types/TypeContextRequestingAReference'

vi.mock('../services/ServiceCreateTenant', () => ({
  ServiceCreateTenant: vi.fn(),
}))

vi.mock('@/repositories/rental.repository', () => ({
  rentalRepository: {
    create: vi.fn(),
    findOverlappingRental: vi.fn(),
  },
}))

vi.mock('@/repositories/tenant-verification.repository', () => ({
  tenantVerificationRepository: {
    findTenantVerificationByToken: vi.fn(),
    markAsValidated: vi.fn(),
  },
}))

vi.mock('@/features/Emails/lib/smtp', () => ({
  sendEmailViaSmtp: vi.fn(),
}))

describe('UseCaseRequestingAReference', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    process.env.SEND_LANDLORD_EMAIL = 'true'

    vi.mocked(rentalRepository.findOverlappingRental).mockResolvedValue(null)
  })

  it('completes a reference request workflow', async () => {
    const tenant: Tenant = {
      documentId: 'tenant-123',
      email: 'tenant@test.com',
      firstname: 'Antoine',
      lastname: 'G',
    }

    const tenantVerification: TenantVerification = {
      documentId: 'verification-123',
      tenantVerificationToken: 'verification-token',
    }

    const rental: Rental = {
      documentId: 'rental-123',
      rentalToken: 'rental-token',
    }

    vi.mocked(ServiceCreateTenant).mockResolvedValue(tenant)

    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue(tenantVerification)

    vi.mocked(tenantVerificationRepository.markAsValidated).mockResolvedValue(
      undefined,
    )

    vi.mocked(rentalRepository.create).mockResolvedValue(rental)

    const context: TypeContextRequestingAReference = {
      formInput: {
        email: 'tenant@test.com',
        firstname: 'Antoine',
        lastname: 'G',
        address: {
          label: '35 Rue Pelleport 33800 Bordeaux',
          city: 'Bordeaux',
        },
        startDate: '2026-07-31',
        endDate: '2026-08-29',
        landlordEmail: 'landlord@test.com',
        tenantVerificationToken: 'verification-token',
      },
    }

    await new UseCaseRequestingAReference(context).execute()

    expect(context.tenant).toEqual(tenant)
    expect(context.rental).toEqual(rental)
    expect(context.tenantVerification).toEqual(tenantVerification)

    expect(rentalRepository.findOverlappingRental).toHaveBeenCalledWith({
      tenantDocumentId: tenant.documentId,
      startDate: '2026-07-31',
      endDate: '2026-08-29',
    })

    expect(rentalRepository.create).toHaveBeenCalled()
    expect(sendEmailViaSmtp).toHaveBeenCalled()
  })

  it('rejects a reference request when the tenant already has a rental during the requested period', async () => {
    const tenant: Tenant = {
      documentId: 'tenant-123',
      email: 'tenant@test.com',
      firstname: 'Antoine',
      lastname: 'G',
    }

    const tenantVerification: TenantVerification = {
      documentId: 'verification-123',
      tenantVerificationToken: 'verification-token',
    }

    vi.mocked(ServiceCreateTenant).mockResolvedValue(tenant)

    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue(tenantVerification)

    vi.mocked(rentalRepository.findOverlappingRental).mockResolvedValue({
      documentId: 'rental-existing',
      tenantDocumentId: 'tenant-123',
      startDate: '2026-07-01',
      endDate: '2026-08-15',
    })

    const context: TypeContextRequestingAReference = {
      formInput: {
        email: 'tenant@test.com',
        firstname: 'Antoine',
        lastname: 'G',
        address: {
          label: '35 Rue Pelleport 33800 Bordeaux',
          city: 'Bordeaux',
        },
        startDate: '2026-07-31',
        endDate: '2026-08-29',
        landlordEmail: 'landlord@test.com',
        tenantVerificationToken: 'verification-token',
      },
    }

    await expect(
      new UseCaseRequestingAReference(context).execute(),
    ).rejects.toThrow(
      'Ce locataire possède déjà une location sur cette période.',
    )

    expect(rentalRepository.create).not.toHaveBeenCalled()
    expect(tenantVerificationRepository.markAsValidated).not.toHaveBeenCalled()
    expect(sendEmailViaSmtp).not.toHaveBeenCalled()
  })
})
