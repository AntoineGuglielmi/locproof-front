/* eslint-disable react/no-unescaped-entities */
import PageSubTitle from '@/shared/components/headings/page-sub-title'
import TextBody from '@/shared/components/text/text-body'

type CreateReferenceFormSuccessProps = object

export default function CreateReferenceFormSuccess({}: CreateReferenceFormSuccessProps) {
  return (
    <>
      <PageSubTitle>Merci pour votre recommandation !</PageSubTitle>

      <TextBody className="text-balance mb-4">
        Votre retour a bien été enregistré et sera pris en compte dans le profil
        LocProof du locataire.
      </TextBody>

      <TextBody className="text-balance">
        Merci d'avoir pris le temps de partager votre expérience. Vous pouvez
        maintenant fermer cette page en toute sécurité.{' '}
      </TextBody>
    </>
  )
}
