import { Tenant } from '@/types/strapi-types'

export class EntityTenant {
  private _email: Tenant['email']
  private _firstname: Tenant['firstname']
  private _lastname: Tenant['lastname']
  private _slug: Tenant['slug']
  private _verified: Tenant['verified']

  constructor(tenant: Tenant) {
    this._email = tenant.email
    this._firstname = tenant.firstname
    this._lastname = tenant.lastname
    this._slug = tenant.slug
    this._verified = tenant.verified
  }

  get email() {
    return this._email
  }

  get firstname() {
    return this._firstname
  }

  get lastname() {
    return this._lastname
  }

  get slug() {
    return this._slug
  }

  get verified() {
    return this._verified
  }
}
