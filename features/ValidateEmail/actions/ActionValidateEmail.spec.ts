import { UseCaseValidateEmail } from '../useCase/UseCaseValidateEmail'
import { ActionValidateEmail } from './ActionValidateEmail'

const executeMock = vi.fn()

vi.mock('../useCase/UseCaseValidateEmail', () => ({
  UseCaseValidateEmail: vi.fn().mockImplementation(function () {
    return {
      execute: executeMock,
    }
  }),
}))

const invalidEmailInput = {
  email: 'invalid-email',
  tenantVerificationToken: null,
}

const validEmailInput = {
  email: 'hello@example.com',
  tenantVerificationToken: null,
}

describe('ActionValidateEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    executeMock.mockResolvedValue(undefined)
  })

  it('should return error and not create useCase when email is invalid', async () => {
    const result = await ActionValidateEmail(invalidEmailInput)

    expect(result.success).toBe(false)
    expect(UseCaseValidateEmail).not.toHaveBeenCalled()
  })

  it('should create useCase with the right context when email is valid', async () => {
    await ActionValidateEmail(validEmailInput)

    expect(UseCaseValidateEmail).toHaveBeenCalledWith({
      email: validEmailInput.email,
      tenantVerificationToken: null,
    })
  })

  it('should execute useCase and return success when email is valid', async () => {
    const result = await ActionValidateEmail(validEmailInput)

    expect(executeMock).toHaveBeenCalledTimes(1)

    expect(result).toEqual({
      success: true,
    })
  })

  it('should return error when useCase fails', async () => {
    executeMock.mockRejectedValue(new Error('Database error'))

    const result = await ActionValidateEmail(validEmailInput)

    expect(result).toEqual({
      success: false,
      error: 'Database error',
    })
  })
})
