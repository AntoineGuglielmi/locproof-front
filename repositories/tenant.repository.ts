import { strapiClient } from '@/lib/strapi'
import { EntityTenant } from '@/shared/entities/EntityTenant'
import { Tenant } from '@/types/strapi-types'

export const tenantRepository = {
  async create({
    email,
    firstname,
    lastname,
  }: {
    email: Tenant['email']
    firstname: Tenant['firstname']
    lastname: Tenant['lastname']
  }) {
    const slug =
      `${firstname}-${lastname}-${await this.getSlugSuffix(firstname!, lastname!)}`.toLowerCase()
    return await strapiClient.collection('tenants').create({
      email,
      firstname,
      lastname,
      slug,
      verified: true,
    })
  },

  async getSlugSuffix(firstname: string, lastname: string): Promise<number> {
    const tenantsWithSameFirstnameAndLastname = await strapiClient
      .collection('tenants')
      .find({
        filters: {
          firstname: {
            $eq: firstname,
          },
          lastname: {
            $eq: lastname,
          },
        },
      })
    return tenantsWithSameFirstnameAndLastname.data.length + 1
  },

  async findByEmail(email: string): Promise<Tenant | null> {
    const res = await strapiClient.collection('tenants').find({
      filters: {
        email: {
          $eq: email,
        },
      },
    })
    return res.data.length > 0 ? res.data[0] : null
  },

  async findEntityByEmail(email: string): Promise<EntityTenant> {
    const res = await strapiClient.collection('tenants').find({
      filters: {
        email: {
          $eq: email,
        },
      },
    })
    return new EntityTenant(res.data.length > 0 ? res.data[0] : { email })
  },

  async checkIfTenantExists(email: Tenant['email']): Promise<Tenant | null> {
    const res = await strapiClient.collection('tenants').find({
      filters: {
        email: {
          $eq: email,
        },
      },
    })
    return res.data[0] || null
  },

  async update(
    tenantDocumentId: Tenant['documentId'],
    {
      firstname,
      lastname,
    }: {
      firstname?: Tenant['firstname']
      lastname?: Tenant['lastname']
    },
  ) {
    const slug = `${firstname}-${lastname}-${await this.getSlugSuffix(
      firstname!,
      lastname!,
    )}`.toLowerCase()
    const tenant = await strapiClient
      .collection('tenants')
      .update(tenantDocumentId!, {
        firstname,
        lastname,
        slug,
      })
    return tenant
  },

  async findBydDocumentId(
    documentId: Tenant['documentId'],
  ): Promise<Tenant | null> {
    const res = await strapiClient.collection('tenants').find({
      filters: {
        documentId: {
          $eq: documentId,
        },
      },
    })
    return res.data.length > 0 ? res.data[0] : null
  },

  async findBySlug(slug: Tenant['slug']): Promise<Tenant | null> {
    const res = await strapiClient.collection('tenants').find({
      filters: {
        slug: {
          $eq: slug,
        },
      },
    })
    return res.data.length > 0 ? res.data[0] : null
  },
}
