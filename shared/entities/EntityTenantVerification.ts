import { TenantVerification } from '@/types/strapi-types'

export class EntityTenantVerification {
  private _email: TenantVerification['email']
  private _expiresAt: TenantVerification['expiresAt']
  private _tenantVerificationToken: TenantVerification['tenantVerificationToken']
  private _state: TenantVerification['state']

  constructor({
    email,
    expiresAt,
    tenantVerificationToken,
    state,
  }: TenantVerification) {
    this._email = email
    this._expiresAt = expiresAt
    this._tenantVerificationToken = tenantVerificationToken
    this._state = state
  }

  get email() {
    return this._email
  }

  get expiresAt() {
    return this._expiresAt
  }

  get token() {
    return this._tenantVerificationToken
  }

  get state() {
    return this._state
  }

  isExpired() {
    return new Date(this._expiresAt!) < new Date()
  }

  isValid() {
    return !this.isExpired() && this._state === 'pending'
  }
}
