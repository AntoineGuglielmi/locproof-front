import { tenantRepository } from '@/repositories/tenant.repository'
import { TypeContextWithEmail } from '../../types/TypesSteps'
import { StepRetrieveTenant } from './StepRetrieveTenant'

vi.mock('@/repositories/tenant.repository', () => ({
  tenantRepository: {
    findByEmail: vi.fn(),
  },
}))

const tenants = new Map([
  [
    ['the tenant', 'does exist'],
    {
      documentId: 'tenant-document-id',
      firstname: 'Antoine',
      lastname: 'Guglielmi',
      email: 'antoine@example.com',
      slug: 'antoine-guglielmi',
    },
  ],
  [['null', 'does not exist'], null],
])

describe('StepRetrieveTenant', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  for (const [[expected, condition], tenant] of tenants) {
    it(`retrieves ${expected} and adds it to the context when it ${condition}`, async () => {
      vi.mocked(tenantRepository.findByEmail).mockResolvedValue(tenant)

      const context: TypeContextWithEmail = {
        email: 'antoine@example.com',
        tenant: null,
      }

      const step = new StepRetrieveTenant()

      await step.execute(context)

      expect(tenantRepository.findByEmail).toHaveBeenCalledWith(
        'antoine@example.com',
      )

      expect(context.tenant).toEqual(tenant)
    })
  }

  it('throws an error when tenant retrieval fails', async () => {
    vi.mocked(tenantRepository.findByEmail).mockRejectedValue(
      new Error('Database error'),
    )

    const context: TypeContextWithEmail = {
      email: 'antoine@example.com',
      tenant: null,
    }

    const step = new StepRetrieveTenant()

    await expect(step.execute(context)).rejects.toThrow(
      'Impossible de récupérer le locataire',
    )
  })
})
