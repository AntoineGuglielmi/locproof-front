import { Tenant } from '@/types/strapi-types'
import { Resend } from 'resend'
import NewReference from '@/features/Emails/components/new-reference'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendReferenceEmailToTenant = async ({
  tenantEmail,
  tenantSlug,
}: {
  tenantEmail: Tenant['email']
  tenantSlug: Tenant['slug']
}) => {
  const href = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${tenantSlug}`
  await resend.emails.send({
    from: 'LocProof <hello@locproof.fr>',
    to: tenantEmail!,
    subject: 'Votre recommandation a été rédigée !',
    react: NewReference({ href }),
  })
}
