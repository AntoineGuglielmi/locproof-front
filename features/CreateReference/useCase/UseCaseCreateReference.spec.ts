import { beforeEach, describe, expect, it, vi } from 'vitest'
import { UseCaseCreateReference } from './UseCaseCreateReference'
import { referenceRepository } from '@/repositories/reference.repository'
import { rentalRepository } from '@/repositories/rental.repository'
import { Rental, Tenant } from '@/shared/types/strapi-types'
import { TypeContextCreateReference } from '../types/TypeContextCreateReference'
import { sendEmailViaSmtp } from '@/features/Emails/lib/smtp'

vi.mock('@/repositories/reference.repository', () => ({
  referenceRepository: {
    create: vi.fn(),
  },
}))

vi.mock('@/repositories/rental.repository', () => ({
  rentalRepository: {
    findByRentalToken: vi.fn(),
    markAsValidated: vi.fn(),
  },
}))

vi.mock('@/repositories/tenant.repository', () => ({
  tenantRepository: {
    findBydDocumentId: vi.fn(),
  },
}))

vi.mock('@/features/Emails/lib/smtp', () => ({
  sendEmailViaSmtp: vi.fn(),
}))

describe('UseCaseCreateReference', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('completes a reference creation workflow', async () => {
    process.env.SEND_TENANT_EMAIL = 'true'

    const tenant = {
      documentId: 'tenant-123',
      email: 'tenant@test.com',
      slug: 'antoine-g',
      firstname: 'Antoine',
      lastname: 'G',
    } as Tenant

    const rental = {
      documentId: 'rental-123',
      tenant,
      state: 'pending',
    } as Rental

    vi.mocked(rentalRepository.findByRentalToken).mockResolvedValue(rental)
    vi.mocked(referenceRepository.create).mockResolvedValue(undefined)
    vi.mocked(rentalRepository.markAsValidated).mockResolvedValue(undefined)
    vi.mocked(sendEmailViaSmtp).mockResolvedValue(undefined)

    const context: TypeContextCreateReference = {
      formInput: {
        paidOnTime: 'yes',
        wellMaintained: 'yes',
        communication: 'yes',
        recommended: 'yes',
        comment: 'Très bon locataire',
      },
      rentalToken: 'rental-token',
      rental: null,
    }

    await new UseCaseCreateReference(context).execute()

    expect(context.rental).toEqual(rental)

    expect(referenceRepository.create).toHaveBeenCalledWith({
      paidOnTime: 'yes',
      wellMaintained: 'yes',
      communication: 'yes',
      recommended: 'yes',
      comment: 'Très bon locataire',
      rental,
    })

    expect(rentalRepository.markAsValidated).toHaveBeenCalledWith('rental-123')

    expect(rentalRepository.findByRentalToken).toHaveBeenCalledWith(
      'rental-token',
    )

    expect(sendEmailViaSmtp).toHaveBeenCalled()
  })
})
