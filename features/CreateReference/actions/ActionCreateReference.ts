'use server'

import { TypeInputCreateReference } from '../types/TypeInputCreateReference'
import { TypeContextCreateReference } from '../types/TypeContextCreateReference'
import { UseCaseCreateReference } from '../useCase/UseCaseCreateReference'
import { TypeCreateReferenceFormValues } from '../types/TypeCreateReferenceFormValues'

export async function ActionCreateReference(
  formInput: TypeCreateReferenceFormValues,
) {
  const contextCreateReference: TypeContextCreateReference = {
    formInput,
    rental: null,
    tenant: null,
  }

  const useCaseCreateReference = new UseCaseCreateReference(
    contextCreateReference,
  )

  useCaseCreateReference.execute()
}
