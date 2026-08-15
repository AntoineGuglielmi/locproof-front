import { Rental } from '../types/strapi-types'

export class EntityRental {
  private _state: Rental['state']
  private _expiresAt: Rental['expiresAt']

  constructor(rental: Rental) {
    const { state, expiresAt } = rental
    this._state = state
    this._expiresAt = expiresAt
  }

  get state(): Rental['state'] {
    return this._state
  }

  get expiresAt(): Rental['expiresAt'] {
    return this._expiresAt
  }

  isValidated(): boolean {
    return this.state === 'validated'
  }

  isExpired(): boolean {
    return new Date(this._expiresAt!) < new Date()
  }
}
