'use server'

import { TypeContextRequestingAReference } from '../types/TypeContextRequestingAReference'
import { TypeInputRequestingAReference } from '../types/TypeInputRequestingAReference'
import { UseCaseRequestingAReference } from '../useCase/UseCaseRequestingAReference'

export const ActionRequestingAReference = async (
  formInput: TypeInputRequestingAReference,
): Promise<void> => {
  const contextRequestingAReference: TypeContextRequestingAReference = {
    formInput,
    tenant: null,
    tenantVerification: null,
    rental: null,
  }

  const useCaseRequestingAReference = new UseCaseRequestingAReference(
    contextRequestingAReference,
  )

  useCaseRequestingAReference.execute()
}
