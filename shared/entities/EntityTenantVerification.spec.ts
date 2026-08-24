import { EntityTenantVerification } from './EntityTenantVerification'

describe('EntityTenantVerification', () => {
  describe('isExpired', () => {
    it('returns true when the verification has expired', () => {
      const entity = new EntityTenantVerification({
        expiresAt: new Date('2026-01-01'),
        state: 'pending',
      })

      expect(entity.isExpired()).toBe(true)
    })

    it('returns false when the verification has not expired', () => {
      const entity = new EntityTenantVerification({
        expiresAt: new Date('2076-01-01'),
        state: 'pending',
      })

      expect(entity.isExpired()).toBe(false)
    })
  })

  describe('isValidated', () => {
    it('returns true when the state is validated', () => {
      const entity = new EntityTenantVerification({
        expiresAt: new Date('2076-01-01'),
        state: 'validated',
      })

      expect(entity.isValidated()).toBe(true)
    })

    it('returns false when the state is pending', () => {
      const entity = new EntityTenantVerification({
        expiresAt: new Date('2076-01-01'),
        state: 'pending',
      })

      expect(entity.isValidated()).toBe(false)
    })
  })

  describe('isValid', () => {
    it('returns true for a pending non-expired verification', () => {
      const entity = new EntityTenantVerification({
        expiresAt: new Date('2076-01-01'),
        state: 'pending',
      })

      expect(entity.isValid()).toBe(true)
    })

    it('returns false for an expired verification', () => {
      const entity = new EntityTenantVerification({
        expiresAt: new Date('2026-01-01'),
        state: 'pending',
      })

      expect(entity.isValid()).toBe(false)
    })

    it('returns false for a validated verification', () => {
      const entity = new EntityTenantVerification({
        expiresAt: new Date('2076-01-01'),
        state: 'validated',
      })

      expect(entity.isValid()).toBe(false)
    })
  })
})
