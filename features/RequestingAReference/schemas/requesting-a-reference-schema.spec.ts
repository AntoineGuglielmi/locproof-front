import { requestingAReferenceSchema } from './requesting-a-reference-schema'

const validInput = {
  email: 'tenant@test.com',
  firstname: 'Antoine',
  lastname: 'Guglielmi',
  address: {
    label: '35 Rue Pelleport, 33800 Bordeaux',
    city: 'Bordeaux',
  },
  startDate: new Date('2026-07-31'),
  endDate: new Date('2026-08-29'),
  landlordEmail: 'landlord@test.com',
  tenantVerificationToken: 'verification-token',
}

describe('requesting-a-reference-schema', () => {
  it('accepts valid input', () => {
    const result = requestingAReferenceSchema.safeParse(validInput)

    expect(result.success).toBe(true)
  })

  it('rejects when start date is missing', () => {
    const result = requestingAReferenceSchema.safeParse({
      ...validInput,
      startDate: undefined,
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({
          path: ['startDate'],
          message: 'Vous devez renseigner une date de début de location',
        }),
      )
    }
  })

  it('rejects when end date is before start date', () => {
    const result = requestingAReferenceSchema.safeParse({
      ...validInput,
      startDate: new Date('2026-08-29'),
      endDate: new Date('2026-07-31'),
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({
          path: ['endDate'],
          message: 'La date de fin doit être après la date de début',
        }),
      )
    }
  })

  it('accepts the same start and end date', () => {
    const date = new Date('2026-08-29')

    const result = requestingAReferenceSchema.safeParse({
      ...validInput,
      startDate: date,
      endDate: date,
    })

    expect(result.success).toBe(true)
  })

  it('accepts when start and end dates are the same', () => {
    const date = new Date('2026-08-29')

    const result = requestingAReferenceSchema.safeParse({
      ...validInput,
      startDate: date,
      endDate: date,
    })

    expect(result.success).toBe(true)
  })
})
