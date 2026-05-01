import { strapiClient } from '@/lib/strapi'
import { EntityTenant } from '@/shared/entities/EntityTenant'
import { Tenant } from '@/types/strapi-types'
import slugify from 'slugify'

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
    const newTenant = await strapiClient.collection('tenants').create({
      email,
      firstname,
      lastname,
      verified: true,
    })
    const { id, documentId } = newTenant.data
    const baseSlug = slugify(`${firstname}-${lastname}`, {
      lower: true,
      strict: true,
    })
    const slug = `${baseSlug}-${id}`
    return await strapiClient.collection('tenants').update(documentId, {
      slug,
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
    const tenant = (
      await strapiClient.collection('tenants').find({
        filters: {
          documentId: {
            $eq: tenantDocumentId,
          },
        },
      })
    ).data[0]

    const { id } = tenant

    const baseSlug = slugify(`${firstname}-${lastname}`, {
      lower: true,
      strict: true,
    })
    const slug = `${baseSlug}-${id}`.toLowerCase()

    const tenantUpdate = await strapiClient
      .collection('tenants')
      .update(tenantDocumentId!, {
        firstname,
        lastname,
        slug,
      })
    return tenantUpdate
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
