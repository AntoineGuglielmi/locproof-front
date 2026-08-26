import {
  createReferenceSchema,
  referenceAnswerSchema,
} from './create-reference-schema'

describe('referenceAnswerSchema', () => {
  it.each(['yes', 'no', 'skip'])('accepts "%s"', (answer) => {
    const result = referenceAnswerSchema.safeParse(answer)

    expect(result.success).toBe(true)
  })

  it('rejects undefined', () => {
    const result = referenceAnswerSchema.safeParse(undefined)

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Veuillez sélectionner une réponse',
      )
    }
  })

  it('rejects an invalid answer', () => {
    const result = referenceAnswerSchema.safeParse('maybe')

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Veuillez sélectionner une réponse',
      )
    }
  })
})

describe('createReferenceSchema', () => {
  const validInput = {
    paidOnTime: 'yes',
    wellMaintained: 'yes',
    communication: 'yes',
    recommended: 'yes',
    comment: '',
    rentalDocumentId: 'rental-document-id',
  }

  it('accepts a valid input', () => {
    const result = createReferenceSchema.safeParse(validInput)

    expect(result.success).toBe(true)
  })

  it('accepts "skip" as an answer', () => {
    const result = createReferenceSchema.safeParse({
      ...validInput,
      recommended: 'skip',
    })

    expect(result.success).toBe(true)
  })

  it('rejects an incomplete form', () => {
    const result = createReferenceSchema.safeParse({
      ...validInput,
      communication: undefined,
    })

    expect(result.success).toBe(false)
  })

  it('rejects an invalid answer', () => {
    const result = createReferenceSchema.safeParse({
      ...validInput,
      recommended: 'maybe',
    })

    expect(result.success).toBe(false)
  })

  it('accepts an empty comment', () => {
    const result = createReferenceSchema.safeParse({
      ...validInput,
      comment: '',
    })

    expect(result.success).toBe(true)
  })
})
