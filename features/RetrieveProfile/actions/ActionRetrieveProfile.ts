'use server'

import { TypeActionResult } from '@/shared/types/TypeActionResult'
import {
  retrieveProfileSchema,
  RetriveProfileFormValues,
} from '../schemas/retrieve-profile-schema'
import { UseCaseRetrieveProfile } from '../useCase/UseCaseRetrieveProfile'

export const ActionRetrieveProfile = async (
  formvalues: RetriveProfileFormValues,
): Promise<TypeActionResult> => {
  const securedDataFromInput = retrieveProfileSchema.safeParse(formvalues)

  if (!securedDataFromInput.success) {
    return {
      success: false,
      error: 'Email invalide',
    }
  }

  try {
    const { email } = securedDataFromInput.data

    const useCase = new UseCaseRetrieveProfile({
      email,
      tenant: null,
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
