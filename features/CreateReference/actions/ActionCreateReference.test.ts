import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UseCaseCreateReference } from '../useCase/UseCaseCreateReference'
import { ActionCreateReference } from './ActionCreateReference'
import { TypeCreateReferenceFormValues } from '../types/TypeCreateReferenceFormValues'

const executeMock = vi.fn()

vi.mock('../useCase/UseCaseCreateReference', () => ({
  UseCaseCreateReference: vi.fn().mockImplementation(function () {
    return {
      execute: executeMock,
    }
  }),
}))

const invalidInput = {
  paidOnTime: undefined,
  wellMaintained: undefined,
  communication: undefined,
  recommended: undefined,
  comment: '',
  rentalDocumentId: 'rental-123',
} as unknown as TypeCreateReferenceFormValues

const validInput = {
  paidOnTime: 'yes' as const,
  wellMaintained: 'yes' as const,
  communication: 'yes' as const,
  recommended: 'yes' as const,
  comment: 'Très bon locataire.',
  rentalDocumentId: 'rental-123',
}

describe('ActionCreateReference', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    executeMock.mockResolvedValue(undefined)
  })

  it('should return error and not create useCase when input is invalid', async () => {
    const result = await ActionCreateReference(invalidInput)

    expect(result.success).toBe(false)
    expect(UseCaseCreateReference).not.toHaveBeenCalled()
  })

  it('should create useCase with the validated context when input is valid', async () => {
    await ActionCreateReference(validInput)

    expect(UseCaseCreateReference).toHaveBeenCalledWith({
      formInput: validInput,
      rental: null,
      tenant: null,
    })
  })

  it('should execute useCase and return success when input is valid', async () => {
    const result = await ActionCreateReference(validInput)

    expect(executeMock).toHaveBeenCalledTimes(1)

    expect(result).toEqual({
      success: true,
    })
  })

  it('should return error when useCase fails', async () => {
    executeMock.mockRejectedValue(new Error('Impossible de créer la référence'))

    const result = await ActionCreateReference(validInput)

    expect(result).toEqual({
      success: false,
      error: 'Impossible de créer la référence',
    })
  })
})
