'use server'

import { TypeContextCreateReference } from '../types/TypeContextCreateReference'
import { UseCaseCreateReference } from '../useCase/UseCaseCreateReference'
import { TypeCreateReferenceFormValues } from '../types/TypeCreateReferenceFormValues'
import { createReferenceSchema } from '../schemas/create-reference-schema'

export async function ActionCreateReference(
  input: TypeCreateReferenceFormValues,
) {
  const securedDataFromInput = createReferenceSchema.safeParse(input)

  if (!securedDataFromInput.success) {
    return {
      success: false,
      error:
        'Une erreur est survenue lors de la validation des données du formulaire',
    }
  }

  try {
    const formInput = securedDataFromInput.data

    const contextCreateReference: TypeContextCreateReference = {
      formInput,
      rental: null,
      tenant: null,
    }

    const useCase = new UseCaseCreateReference(contextCreateReference)

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
