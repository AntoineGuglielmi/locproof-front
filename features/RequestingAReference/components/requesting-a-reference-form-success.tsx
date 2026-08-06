/* eslint-disable react/no-unescaped-entities */
import PageSubTitle from '@/shared/components/headings/page-sub-title'
import TextBody from '@/shared/components/text/text-body'

type RequestingAReferenceFormSuccessProps = {
  email: string
}

export default function RequestingAReferenceFormSuccess({
  email,
}: RequestingAReferenceFormSuccessProps) {
  return (
    <>
      <PageSubTitle>Votre demande a bien été envoyée</PageSubTitle>

      <TextBody className="text-balance mb-4">
        Nous avons invité votre ancien bailleur à compléter votre recommandation
        locative.
      </TextBody>

      <TextBody className="text-balance">
        Vous serez prévenu à l'adresse{' '}
        <span className="font-bold text-indigo-500">{email}</span> dès que votre
        recommandation sera disponible.
      </TextBody>
    </>
  )
}
