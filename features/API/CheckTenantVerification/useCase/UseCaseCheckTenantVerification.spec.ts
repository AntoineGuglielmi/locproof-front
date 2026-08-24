import { TenantVerification } from '@/shared/types/strapi-types'
import { TypeContextCheckTenantVerification } from '../types/TypeContextCheckTenantVerification'
import { tenantVerificationRepository } from '@/repositories/tenant-verification.repository'
import { rentalRepository } from '@/repositories/rental.repository'
import { UseCaseCheckTenantVerification } from './UseCaseCheckTenantVerification'

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

describe('UseCaseCheckTenantVerificationSpec', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('completes a tenant verification workflow', async () => {
    const expectedTenantVerification: TenantVerification = {
      expiresAt: new Date('2076-01-01'),
      tenantVerificationToken: 'tenant-verification-token',
      state: 'pending',
    }

    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue(expectedTenantVerification)

    vi.mocked(rentalRepository.findByTenantVerificationToken).mockResolvedValue(
      null,
    )

    const context: TypeContextCheckTenantVerification = {
      tenantVerificationToken: 'tenant-verification-token',
      result: null,
      tenantVerification: null,
    }

    await new UseCaseCheckTenantVerification(context).execute()

    expect(context.result).toEqual(null)
    expect(context.tenantVerification).toEqual(expectedTenantVerification)
    expect(context.tenantVerificationToken).toEqual('tenant-verification-token')

    expect(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).toHaveBeenCalledWith('tenant-verification-token')
    expect(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).toHaveBeenCalledTimes(1)

    expect(rentalRepository.findByTenantVerificationToken).toHaveBeenCalledWith(
      'tenant-verification-token',
    )
    expect(
      rentalRepository.findByTenantVerificationToken,
    ).toHaveBeenCalledTimes(1)
  })

  it('fails when the tenant verification token is missing', async () => {
    const context: TypeContextCheckTenantVerification = {
      tenantVerificationToken: null,
      tenantVerification: null,
      result: null,
    }

    const useCase = new UseCaseCheckTenantVerification(context)

    await expect(useCase.execute()).rejects.toThrow(
      'Le lien que vous avez utilisé est invalide.',
    )

    expect(context.result).toBe('no-verification-token')

    expect(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).not.toHaveBeenCalled()

    expect(
      rentalRepository.findByTenantVerificationToken,
    ).not.toHaveBeenCalled()
  })

  it('fails when the tenant verification does not exist', async () => {
    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue(null)

    const context: TypeContextCheckTenantVerification = {
      tenantVerificationToken: 'tenant-verification-token',
      tenantVerification: null,
      result: null,
    }

    const useCase = new UseCaseCheckTenantVerification(context)

    await expect(useCase.execute()).rejects.toThrow(
      'Demande de vérification introuvable.',
    )

    expect(context.result).toBe('no-verification')
    expect(context.tenantVerification).toBeNull()

    expect(
      rentalRepository.findByTenantVerificationToken,
    ).not.toHaveBeenCalled()
  })

  it('fails when the tenant verification has expired', async () => {
    const expiredTenantVerification: TenantVerification = {
      expiresAt: new Date('2026-01-01'),
      tenantVerificationToken: 'tenant-verification-token',
      state: 'pending',
    }

    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue(expiredTenantVerification)

    const context: TypeContextCheckTenantVerification = {
      tenantVerificationToken: 'tenant-verification-token',
      tenantVerification: null,
      result: null,
    }

    const useCase = new UseCaseCheckTenantVerification(context)

    await expect(useCase.execute()).rejects.toThrow(
      'Ce lien de vérification est expiré',
    )

    expect(context.result).toBe('verification-expired')
    expect(context.tenantVerification).toEqual(expiredTenantVerification)

    expect(
      rentalRepository.findByTenantVerificationToken,
    ).not.toHaveBeenCalled()
  })

  it('fails when the tenant verification has already been validated', async () => {
    const validatedTenantVerification: TenantVerification = {
      expiresAt: new Date('2076-01-01'),
      tenantVerificationToken: 'tenant-verification-token',
      state: 'validated',
    }

    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue(validatedTenantVerification)

    const context: TypeContextCheckTenantVerification = {
      tenantVerificationToken: 'tenant-verification-token',
      tenantVerification: null,
      result: null,
    }

    const useCase = new UseCaseCheckTenantVerification(context)

    await expect(useCase.execute()).rejects.toThrow(
      'Ce lien de vérification a déà été utilisé',
    )

    expect(context.result).toBe('verification-already-validated')

    expect(
      rentalRepository.findByTenantVerificationToken,
    ).not.toHaveBeenCalled()
  })

  it('fails when a rental already exists for the tenant verification', async () => {
    const rental = {
      documentId: 'rental-123',
    }

    vi.mocked(
      tenantVerificationRepository.findTenantVerificationByToken,
    ).mockResolvedValue({
      expiresAt: new Date('2076-01-01'),
      tenantVerificationToken: 'tenant-verification-token',
      state: 'pending',
    })

    vi.mocked(rentalRepository.findByTenantVerificationToken).mockResolvedValue(
      rental,
    )

    const context: TypeContextCheckTenantVerification = {
      tenantVerificationToken: 'tenant-verification-token',
      tenantVerification: null,
      result: null,
    }

    const useCase = new UseCaseCheckTenantVerification(context)

    await expect(useCase.execute()).rejects.toThrow(
      'Ce lien de vérification a déà été utilisé',
    )

    expect(context.result).toBe('verification-already-validated')
  })

  it('fails when unknown error pops from rental repo', async () => {
    vi.mocked(rentalRepository.findByTenantVerificationToken).mockRejectedValue(
      new Error('Unexpected error'),
    )

    const context: TypeContextCheckTenantVerification = {
      tenantVerificationToken: 'tenant-verification-token',
      tenantVerification: null,
      result: null,
    }

    const useCase = new UseCaseCheckTenantVerification(context)

    await expect(useCase.execute()).rejects.toThrow(
      'Impossible de récupérer la location',
    )
  })
})
