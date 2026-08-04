'use server'

import { UseCaseValidateEmail } from '../useCase/UseCaseValidateEmail'
import { validateEmailSchema } from '../schemas/validate-email-schema'
import { TypeActionResult } from '@/shared/types/TypeActionResult'

export async function ActionValidateEmail(
  input: unknown,
): Promise<TypeActionResult> {
  const securedDataFromInput = validateEmailSchema.safeParse(input)

  if (!securedDataFromInput.success) {
    return {
      success: false,
      error: 'Email invalide',
    }
  }

  try {
    const { email } = securedDataFromInput.data

    const useCase = new UseCaseValidateEmail({
      email,
      tenantVerificationToken: null,
    })

    await useCase.execute()

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Une erreur est survenue',
    }
  }
}
