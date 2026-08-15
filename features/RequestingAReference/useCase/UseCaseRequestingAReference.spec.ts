import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UseCaseRequestingAReference } from './UseCaseRequestingAReference'
import { ServiceCreateTenant } from '../services/ServiceCreateTenant'
import { rentalRepository } from '@/repositories/rental.repository'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { sendEmailViaResend } from '@/features/Emails/lib/resend'
import { Rental, Tenant, TenantVerification } from '@/shared/types/strapi-types'
import { TypeContextRequestingAReference } from '../types/TypeContextRequestingAReference'

vi.mock('../services/ServiceCreateTenant', () => ({
  ServiceCreateTenant: vi.fn(),
}))

vi.mock('@/repositories/rental.repository', () => ({
  rentalRepository: {
    create: vi.fn(),
  },
}))

vi.mock('@/repositories/tenant-verification.repository', () => ({
  tenantVerificationRepository: {
    findTenantVerificationByToken: vi.fn(),
    markAsValidated: vi.fn(),
  },
}))

vi.mock('@/features/Emails/lib/resend', () => ({
  sendEmailViaResend: vi.fn(),
}))

describe('UseCaseRequestingAReference', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('completes a reference request workflow', async () => {
    process.env.SEND_LANDLORD_EMAIL = 'true'

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

    expect(sendEmailViaResend).toHaveBeenCalled()
  })
})
