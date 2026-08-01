'use server'

import { ServiceInitDossier } from '@/services/ServiceInitDossier'
import { Tenant } from '@/types/strapi-types'

export const ActionValidateEmail = async ({
  email,
}: {
  email: Tenant['email']
}): Promise<void> => {
  await ServiceInitDossier({ email })
}
