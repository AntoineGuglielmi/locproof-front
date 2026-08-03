'use server'

import { Tenant } from '@/shared/types/strapi-types'
import { UseCaseValidateEmail } from '../useCase/UseCaseValidateEmail'
import { TypeContextValidateEmail } from '../types/TypeContextValidateEmail'

export const ActionValidateEmail = async ({
  email,
}: {
  email: Tenant['email']
}): Promise<void> => {
  const contextValidateEmail: TypeContextValidateEmail = {
    email,
    tenantVerificationToken: null,
  }

  const useCaseValidateEmail = new UseCaseValidateEmail(contextValidateEmail)

  useCaseValidateEmail.execute()
}
