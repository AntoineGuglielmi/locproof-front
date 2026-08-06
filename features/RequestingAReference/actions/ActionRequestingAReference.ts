'use server'

import { TypeActionResult } from '@/shared/types/TypeActionResult'
import { requestingAReferenceSchema } from '../schemas/requesting-a-reference-schema'
import { TypeContextRequestingAReference } from '../types/TypeContextRequestingAReference'
import { TypeInputRequestingAReference } from '../types/TypeInputRequestingAReference'
import { UseCaseRequestingAReference } from '../useCase/UseCaseRequestingAReference'

export const ActionRequestingAReference = async (
  input: TypeInputRequestingAReference,
): Promise<TypeActionResult> => {
  const securedDataFromInput = requestingAReferenceSchema.safeParse(input)

  if (!securedDataFromInput.success) {
    return {
      success: false,
      error:
        'Une erreur est survenue lors de la validation des données du formulaire',
    }
  }

  try {
    const formInput = securedDataFromInput.data

    const contextRequestingAReference: TypeContextRequestingAReference = {
      formInput,
      tenant: null,
      tenantVerification: null,
      rental: null,
    }

    const useCase = new UseCaseRequestingAReference(contextRequestingAReference)

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
