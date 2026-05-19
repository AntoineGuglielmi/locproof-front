import EmailValidation from '@/features/Email/components/templates/email-validation'
import YouGotAReference from '@/features/Email/components/templates/you-got-a-reference'
import YouGotARequest from '@/features/Email/components/templates/you-got-a-request'
import { Rental, Tenant } from '@/types/strapi-types'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendValidationEmail({
  to,
  tenantVerificationToken,
}: {
  to: string
  tenantVerificationToken: string
}) {
  const href = `${process.env.NEXT_PUBLIC_APP_URL}/api/check-tenant-verification?tenantVerificationToken=${tenantVerificationToken}`

  await resend.emails.send({
    from: `LocProof <${process.env.RESEND_EMAIL_FROM}>`,
    to,
    subject: 'Validez votre adresse email',
    react: EmailValidation({ href }),
  })
}

export const sendEmailToLandlord = async ({
  landlordEmail,
  rentalToken,
}: {
  landlordEmail: Rental['landlordEmail']
  rentalToken: Rental['rentalToken']
}) => {
  const href = `${process.env.NEXT_PUBLIC_APP_URL}/api/check-rental?rentalToken=${rentalToken}`
  await resend.emails.send({
    from: `LocProof <${process.env.RESEND_EMAIL_FROM}>`,
    to: landlordEmail!,
    subject:
      'Vous avez reçu une demande de recommandation de la part de votre ancien locataire',
    react: YouGotARequest({ href }),
  })
}

export const sendReferenceEmailToTenant = async ({
  tenantEmail,
  tenantSlug,
}: {
  tenantEmail: Tenant['email']
  tenantSlug: Tenant['slug']
}) => {
  const href = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${tenantSlug}`
  await resend.emails.send({
    from: `LocProof <${process.env.RESEND_EMAIL_FROM}>`,
    to: tenantEmail!,
    subject: 'Votre recommandation a été rédigée !',
    react: YouGotAReference({ href }),
  })
}
