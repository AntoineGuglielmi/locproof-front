'use server'

import { ServiceInitDossier } from '@/services/ServiceInitDossier'
import { Tenant } from '@/types/strapi-types'

export const ActionSendMailToTenant = async ({
  email,
}: {
  email: Tenant['email']
}): Promise<void> => {
  const { tenantVerificationToken } = await ServiceInitDossier({ email })
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/send/email-verification`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        tenantVerificationToken,
      }),
    },
  )
  console.log({
    res,
  })
}
