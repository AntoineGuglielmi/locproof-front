import { Tenant } from '@/shared/types/strapi-types'
import { TypeSynthesis } from '@/shared/types/profile-synthesis'

export const exampleTenant: Tenant = {
  id: 1,
  documentId: 'example-tenant',
  firstname: 'Martin',
  lastname: 'Dupont',
  email: 'martin.dupont@example.com',
  slug: 'martin-dupont-example',
  verified: true,
}

export const exampleSynthesis: TypeSynthesis = {
  referencesCount: 2,

  scores: {
    paidOnTime: 1,
    wellMaintained: 1,
    communication: 1,
    recommended: 1,
  },

  references: [
    {
      id: 'example-reference-1',
      cityPublic: 'Lyon',
      startDate: 'janv. 2022',
      endDate: 'mars 2024',

      paidOnTime: 'yes',
      wellMaintained: 'yes',
      communication: 'yes',
      recommended: 'yes',

      comment:
        'Très bon locataire, sérieux et respectueux. Les échanges ont toujours été simples et constructifs.',
    },

    {
      id: 'example-reference-2',
      cityPublic: 'Lyon',
      startDate: 'juin 2020',
      endDate: 'déc. 2021',

      paidOnTime: 'yes',
      wellMaintained: 'yes',
      communication: 'yes',
      recommended: 'yes',

      comment:
        'Locataire sérieux et agréable dans les échanges. Le logement a toujours été correctement entretenu.',
    },
  ],
}
