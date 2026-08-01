'use server'

import { TypeInputRequestingAReference } from '../types/TypeInputRequestingAReference'
import { UseCaseRequestingAReference } from '../useCase/UseCaseRequestingAReference'

export const ActionRequestingAReference = async (
  formInput: TypeInputRequestingAReference,
): Promise<void> => {
  const ContextRequestingAReference = {
    formInput,
    tenant: null,
    tenantVerification: null,
    rental: null,
  }

  const useCaseRequestingAReference = new UseCaseRequestingAReference(
    ContextRequestingAReference,
  )

  useCaseRequestingAReference.execute()
}
