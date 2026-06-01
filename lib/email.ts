import { Rental, Tenant } from '@/types/strapi-types'
import { Resend } from 'resend'
import { render } from "@react-email/render";
import EmailValidation from '@/features/Emails/components/email-verification';
import ValidateRental from '@/features/Emails/components/validate-rental';
import NewReference from '@/features/Emails/components/new-reference';

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
    from: 'LocProof <hello@locproof.fr>',
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
    from: 'LocProof <hello@locproof.fr>',
    to: landlordEmail!,
    subject:
      'Vous avez reçu une demande de recommandation de la part de votre ancien locataire',
    react: ValidateRental({ href }),
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
    from: 'LocProof <hello@locproof.fr>',
    to: tenantEmail!,
    subject: 'Votre recommandation a été rédigée !',
    react: NewReference({ href }),
  })
}
