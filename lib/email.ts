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
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/create/validate?tenantVerificationToken=${tenantVerificationToken}`

  await resend.emails.send({
    from: 'LocProof <onboarding@resend.dev>',
    to,
    subject: 'Validez votre adresse email',
    html: `
      <p>Bonjour,</p>
      <p>Vous êtes sur le point de demander une recommandation à un ancien bailleur.</p>
      <p>Pour vérifier que cette demande vient bien de vous, cliquez simplement sur le lien ci-dessous :</p>
      <p><a href="${url}">👉 Confirmer ma demande</a></p>
      <p>Ce lien est valable pendant 24 heures.</p>
      <p>Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer cet email.</p>
      <p></p>
      <p>—</p>
      <p></p>
      <p>LocProof</p>
    `,
  })
}

export const sendEmailToLandlord = async ({
  landlordEmail,
  rentalToken,
}: {
  landlordEmail: Rental['landlordEmail']
  rentalToken: Rental['rentalToken']
}) => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/check-rental?rentalToken=${rentalToken}`
  console.log({
    landlordEmail,
    rentalToken,
    url,
  })
  await resend.emails.send({
    from: 'LocProof <onboarding@resend.dev>',
    to: landlordEmail!,
    subject:
      'Vous avez reçu une demande de recommandation de la part de votre ancien locataire',
    html: `
      <p>Bonjour,</p>
      <p>Votre ancien locataire vous a demandé une recommandation via LocProof, la plateforme de recommandation de location.</p>
      <p>Pour consulter cette demande et rédiger votre recommandation, cliquez simplement sur le lien ci-dessous :</p>
      <p><a href="${url}">👉 Rédiger ma recommandation</a></p>
      <p>Ce lien est valable pendant 7 jours.</p>
      <p>Si vous ne souhaitez pas rédiger de recommandation, vous pouvez ignorer cet email.</p>
      <p></p>
      <p>—</p>
      <p></p>
      <p>LocProof</p>
    `,
  })
}

export const sendReferenceEmailToTenant = async ({
  tenantEmail,
  tenantSlug,
}: {
  tenantEmail: Tenant['email']
  tenantSlug: Tenant['slug']
}) => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${tenantSlug}`
  await resend.emails.send({
    from: 'LocProof <onboarding@resend.dev>',
    to: tenantEmail!,
    subject: 'Votre recommandation a été rédigée !',
    html: `
      <p>Bonjour,</p>
      <p>Votre ancien bailleur a rédigé une recommandation pour vous sur LocProof, la plateforme de recommandation de location.</p>
      <p>Cette recommandation est désormais disponible sur votre profil. Pour la consulter, cliquez simplement sur le lien ci-dessous :</p>
      <p><a href="${url}">👉 Rédiger ma recommandation</a></p>
      <p>Si vous pensez qu'il y a une erreur ou si vous avez des questions, n'hésitez pas à contacter notre support.</p>
      <p></p>
      <p>—</p>
      <p></p>
      <p>LocProof</p>
    `,
  })
}
