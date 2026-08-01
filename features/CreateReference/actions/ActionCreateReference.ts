'use server'

import { TypeInputCreateReference } from '../types/TypeInputCreateReference'
import { TypeContextCreateReference } from '../types/TypeContextCreateReference'
import { UseCaseCreateReference } from '../useCase/UseCaseCreateReference'

export async function ActionCreateReference(
  formInput: TypeInputCreateReference,
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
