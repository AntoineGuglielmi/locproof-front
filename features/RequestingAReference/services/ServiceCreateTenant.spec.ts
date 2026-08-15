import { ServiceCreateTenant } from './ServiceCreateTenant'
import { tenantRepository } from '@/repositories/tenant.repository'
import { Tenant } from '@/shared/types/strapi-types'

vi.mock('@/repositories/tenant.repository', () => ({
  tenantRepository: {
    findByEmail: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
}))

describe('ServiceCreateTenant', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('creates a tenant when none exists', async () => {
    const tenant = {
      documentId: 'tenant-123',
      email: 'test@test.com',
      firstname: 'Antoine',
      lastname: 'G',
    } as Tenant

    vi.mocked(tenantRepository.findByEmail).mockResolvedValue(null)

    vi.mocked(tenantRepository.create).mockResolvedValue(tenant)

    const result = await ServiceCreateTenant({
      email: 'test@test.com',
      firstname: 'Antoine',
      lastname: 'G',
    })

    expect(tenantRepository.findByEmail).toHaveBeenCalledWith('test@test.com')

    expect(tenantRepository.create).toHaveBeenCalledWith({
      email: 'test@test.com',
      firstname: 'Antoine',
      lastname: 'G',
    })

    expect(tenantRepository.update).not.toHaveBeenCalled()

    expect(result).toEqual(tenant)
  })

  it('updates an existing tenant', async () => {
    const existingTenant = {
      documentId: 'tenant-123',
      email: 'test@test.com',
      firstname: 'Old',
      lastname: 'Name',
    } as Tenant

    const updatedTenant = {
      ...existingTenant,
      firstname: 'Antoine',
      lastname: 'G',
    } as Tenant

    vi.mocked(tenantRepository.findByEmail).mockResolvedValue(existingTenant)

    vi.mocked(tenantRepository.update).mockResolvedValue(updatedTenant)

    const result = await ServiceCreateTenant({
      email: 'test@test.com',
      firstname: 'Antoine',
      lastname: 'G',
    })

    expect(tenantRepository.findByEmail).toHaveBeenCalledWith('test@test.com')

    expect(tenantRepository.update).toHaveBeenCalledWith('tenant-123', {
      firstname: 'Antoine',
      lastname: 'G',
    })

    expect(tenantRepository.create).not.toHaveBeenCalled()

    expect(result).toEqual(updatedTenant)
  })
})
