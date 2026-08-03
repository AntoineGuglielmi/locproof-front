import { tenantRepository } from './tenant.repository'
import { strapiClient } from '@/shared/lib/strapi'

type Collection = ReturnType<typeof strapiClient.collection>

vi.mock('@/shared/lib/strapi', () => ({
  strapiClient: {
    collection: vi.fn(),
  },
}))

describe('tenantRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('finds a tenant by email', async () => {
    const find = vi.fn().mockResolvedValue({
      data: [
        {
          documentId: 'tenant-123',
          email: 'test@test.com',
          firstname: 'Antoine',
          lastname: 'G',
        },
      ],
    })

    const collectionMock: Partial<Collection> = {
      find,
    }

    vi.mocked(strapiClient.collection).mockReturnValue(
      collectionMock as Collection,
    )

    const result = await tenantRepository.findByEmail('test@test.com')

    expect(strapiClient.collection).toHaveBeenCalledWith('tenants')

    expect(find).toHaveBeenCalledWith({
      filters: {
        email: {
          $eq: 'test@test.com',
        },
      },
    })

    expect(result).toEqual({
      documentId: 'tenant-123',
      email: 'test@test.com',
      firstname: 'Antoine',
      lastname: 'G',
    })
  })
})
