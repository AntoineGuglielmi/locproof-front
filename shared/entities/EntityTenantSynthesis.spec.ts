import { EntityTenantSynthesis } from './EntityTenantSynthesis'
import { referenceRepository } from '@/repositories/reference.repository'
import { Reference, Tenant } from '@/shared/types/strapi-types'

vi.mock('@/repositories/reference.repository', () => ({
  referenceRepository: {
    findByTenant: vi.fn(),
  },
}))

const mockedFindByTenant = vi.mocked(referenceRepository.findByTenant)

describe('EntityTenantSynthesis', () => {
  const tenant: Tenant = {
    documentId: 'tenant-1',
    firstname: 'Jean',
    lastname: 'Dupont',
    email: 'jean@example.com',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getSynthesis', () => {
    it('returns an empty synthesis when the tenant has no references', async () => {
      mockedFindByTenant.mockResolvedValue([])

      const synthesis = await new EntityTenantSynthesis(tenant).getSynthesis()

      expect(synthesis).toEqual({
        references: [],
        referencesCount: 0,
        scores: {
          communication: 0,
          paidOnTime: 0,
          recommended: 0,
          wellMaintained: 0,
        },
      })

      expect(mockedFindByTenant).toHaveBeenCalledOnce()
      expect(mockedFindByTenant).toHaveBeenCalledWith('tenant-1')
    })

    it('maps references and calculates scores correctly', async () => {
      const references: Reference[] = [
        {
          documentId: 'reference-1',
          comment: 'Très bon locataire.',
          paidOnTime: 'yes',
          wellMaintained: 'yes',
          communication: 'yes',
          recommended: 'yes',
          rental: {
            documentId: 'rental-1',
            cityPublic: 'Lyon',
            startDate: '2022-01-15',
            endDate: '2024-01-15',
          },
        },
        {
          documentId: 'reference-2',
          comment: 'Quelques retards de paiement.',
          paidOnTime: 'no',
          wellMaintained: 'yes',
          communication: 'yes',
          recommended: 'yes',
          rental: {
            documentId: 'rental-2',
            cityPublic: 'Grenoble',
            startDate: '2020-03-01',
            endDate: '2022-03-01',
          },
        },
      ]

      mockedFindByTenant.mockResolvedValue(references)

      const synthesis = await new EntityTenantSynthesis(tenant).getSynthesis()

      expect(synthesis.referencesCount).toBe(2)

      expect(synthesis.references).toEqual([
        {
          id: 'rental-1-reference-1',
          cityPublic: 'Lyon',
          startDate: 'janv. 2022',
          endDate: 'janv. 2024',
          comment: 'Très bon locataire.',
          paidOnTime: 'yes',
          wellMaintained: 'yes',
          communication: 'yes',
          recommended: 'yes',
        },
        {
          id: 'rental-2-reference-2',
          cityPublic: 'Grenoble',
          startDate: 'mars 2020',
          endDate: 'mars 2022',
          comment: 'Quelques retards de paiement.',
          paidOnTime: 'no',
          wellMaintained: 'yes',
          communication: 'yes',
          recommended: 'yes',
        },
      ])

      expect(synthesis.scores).toEqual({
        paidOnTime: 0.5,
        wellMaintained: 1,
        communication: 1,
        recommended: 1,
      })

      expect(mockedFindByTenant).toHaveBeenCalledOnce()
      expect(mockedFindByTenant).toHaveBeenCalledWith('tenant-1')
    })

    it('ignores references without a rental', async () => {
      const references: Reference[] = [
        {
          documentId: 'reference-1',
          comment: 'Référence valide.',
          paidOnTime: 'yes',
          wellMaintained: 'yes',
          communication: 'yes',
          recommended: 'yes',
          rental: {
            documentId: 'rental-1',
            cityPublic: 'Lyon',
            startDate: '2022-01-15',
            endDate: '2024-01-15',
          },
        },
        {
          documentId: 'reference-2',
          comment: 'Référence sans location.',
          paidOnTime: 'no',
          wellMaintained: 'no',
          communication: 'no',
          recommended: 'no',
          rental: null,
        },
      ]

      mockedFindByTenant.mockResolvedValue(references)

      const synthesis = await new EntityTenantSynthesis(tenant).getSynthesis()

      expect(synthesis.referencesCount).toBe(1)

      expect(synthesis.references).toEqual([
        {
          id: 'rental-1-reference-1',
          cityPublic: 'Lyon',
          startDate: 'janv. 2022',
          endDate: 'janv. 2024',
          comment: 'Référence valide.',
          paidOnTime: 'yes',
          wellMaintained: 'yes',
          communication: 'yes',
          recommended: 'yes',
        },
      ])

      expect(synthesis.scores).toEqual({
        paidOnTime: 1,
        wellMaintained: 1,
        communication: 1,
        recommended: 1,
      })
    })

    it('treats skip answers as negative for score calculation', async () => {
      const references: Reference[] = [
        {
          documentId: 'reference-1',
          paidOnTime: 'yes',
          wellMaintained: 'skip',
          communication: 'no',
          recommended: 'yes',
          rental: {
            documentId: 'rental-1',
            cityPublic: 'Paris',
            startDate: '2023-01-01',
            endDate: '2024-01-01',
          },
        },
        {
          documentId: 'reference-2',
          paidOnTime: 'skip',
          wellMaintained: 'yes',
          communication: 'skip',
          recommended: 'no',
          rental: {
            documentId: 'rental-2',
            cityPublic: 'Nantes',
            startDate: '2022-01-01',
            endDate: '2023-01-01',
          },
        },
      ]

      mockedFindByTenant.mockResolvedValue(references)

      const synthesis = await new EntityTenantSynthesis(tenant).getSynthesis()

      expect(synthesis.scores).toEqual({
        paidOnTime: 0.5,
        wellMaintained: 0.5,
        communication: 0,
        recommended: 0.5,
      })
    })

    it('uses the number of valid references as the score denominator', async () => {
      const references: Reference[] = [
        {
          documentId: 'reference-1',
          paidOnTime: 'yes',
          wellMaintained: 'yes',
          communication: 'yes',
          recommended: 'yes',
          rental: {
            documentId: 'rental-1',
            cityPublic: 'Lyon',
            startDate: '2023-01-01',
            endDate: '2024-01-01',
          },
        },
        {
          documentId: 'reference-2',
          paidOnTime: 'no',
          wellMaintained: 'no',
          communication: 'no',
          recommended: 'no',
          rental: null,
        },
      ]

      mockedFindByTenant.mockResolvedValue(references)

      const synthesis = await new EntityTenantSynthesis(tenant).getSynthesis()

      expect(synthesis.referencesCount).toBe(1)

      expect(synthesis.scores).toEqual({
        paidOnTime: 1,
        wellMaintained: 1,
        communication: 1,
        recommended: 1,
      })
    })
  })
})
