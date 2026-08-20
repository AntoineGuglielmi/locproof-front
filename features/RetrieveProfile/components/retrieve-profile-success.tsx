/* eslint-disable react/no-unescaped-entities */
import PageSubTitle from '@/shared/components/headings/page-sub-title'
import TextBody from '@/shared/components/text/text-body'

type RetrieveProfileSuccessProps = {
  email: string
}

export default function RetrieveProfileSuccess({
  email,
}: RetrieveProfileSuccessProps) {
  return (
    <>
      <PageSubTitle>Vérifiez votre boîte mail</PageSubTitle>

      <TextBody className="text-balance">
        Nous avons envoyé un lien vers votre profile à l'adresse{' '}
        <span className="font-bold text-indigo-500 wrap-break-word">
          {email}
        </span>
      </TextBody>
    </>
  )
}
