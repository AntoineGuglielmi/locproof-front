/* eslint-disable react/no-unescaped-entities */
import PageSubTitle from '@/shared/components/headings/page-sub-title'
import TextBody from '@/shared/components/text/text-body'

type ValidateEmailSuccessProps = {
  email: string
}

export default function ValidateEmailSuccess({
  email,
}: ValidateEmailSuccessProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border text-center space-y-4">
      <PageSubTitle>Vérifiez votre boîte mail</PageSubTitle>

      <TextBody>
        Nous avons envoyé un lien sécurisé à l'adresse{' '}
        <span className="font-bold text-indigo-500">{email}</span>. Vous
        disposez de <strong>24 heures</strong> pour cliquer sur ce lien et
        continuer la création de votre dossier locataire.
      </TextBody>
    </div>
  )
}
