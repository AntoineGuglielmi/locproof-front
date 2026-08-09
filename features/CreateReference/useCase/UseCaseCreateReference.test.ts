import { beforeEach, describe, expect, it, vi } from 'vitest'
import { UseCaseCreateReference } from './UseCaseCreateReference'
import { referenceRepository } from '@/repositories/reference.repository'
import { rentalRepository } from '@/repositories/rental.repository'
import { tenantRepository } from '@/repositories/tenant.repository'
import { sendEmailViaResend } from '@/features/Emails/lib/resend'
import { Rental, Tenant } from '@/shared/types/strapi-types'
import { TypeContextCreateReference } from '../types/TypeContextCreateReference'

vi.mock('@/repositories/reference.repository', () => ({
  referenceRepository: {
    create: vi.fn(),
  },
}))

vi.mock('@/repositories/rental.repository', () => ({
  rentalRepository: {
    findByDocumentId: vi.fn(),
    markAsValidated: vi.fn(),
  },
}))

vi.mock('@/repositories/tenant.repository', () => ({
  tenantRepository: {
    findBydDocumentId: vi.fn(),
  },
}))

vi.mock('@/features/Emails/lib/resend', () => ({
  sendEmailViaResend: vi.fn(),
}))

describe('UseCaseCreateReference', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('completes a reference creation workflow', async () => {
    process.env.SEND_TENANT_EMAIL = 'true'

    const rental = {
      documentId: 'rental-123',
      tenantDocumentId: 'tenant-123',
      state: 'pending',
    } as Rental

    const tenant = {
      documentId: 'tenant-123',
      email: 'tenant@test.com',
      slug: 'antoine-g',
      firstname: 'Antoine',
      lastname: 'G',
    } as Tenant

    vi.mocked(rentalRepository.findByDocumentId).mockResolvedValue(rental)
    vi.mocked(tenantRepository.findBydDocumentId).mockResolvedValue(tenant)
    vi.mocked(referenceRepository.create).mockResolvedValue(undefined)
    vi.mocked(rentalRepository.markAsValidated).mockResolvedValue(undefined)
    vi.mocked(sendEmailViaResend).mockResolvedValue(undefined)

    const context: TypeContextCreateReference = {
      formInput: {
        paidOnTime: 'yes',
        wellMaintained: 'yes',
        communication: 'yes',
        recommended: 'yes',
        comment: 'Très bon locataire',
        rentalDocumentId: 'rental-123',
      },
      rental: null,
      tenant: null,
    }

    await new UseCaseCreateReference(context).execute()

    expect(context.rental).toEqual(rental)
    expect(context.tenant).toEqual(tenant)

    expect(referenceRepository.create).toHaveBeenCalledWith({
      paidOnTime: 'yes',
      wellMaintained: 'yes',
      communication: 'yes',
      recommended: 'yes',
      comment: 'Très bon locataire',
      rentalDocumentId: 'rental-123',
    })

    expect(rentalRepository.markAsValidated).toHaveBeenCalledWith('rental-123')

    expect(rentalRepository.findByDocumentId).toHaveBeenCalledWith('rental-123')

    expect(tenantRepository.findBydDocumentId).toHaveBeenCalledWith(
      'tenant-123',
    )

    expect(sendEmailViaResend).toHaveBeenCalled()
  })
})
