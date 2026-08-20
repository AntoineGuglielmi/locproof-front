import PageSubTitle from '@/shared/components/headings/page-sub-title'
import TextBody from '@/shared/components/text/text-body'

type RetrieveProfileSuccessProps = object

export default function RetrieveProfileSuccess({}: RetrieveProfileSuccessProps) {
  return (
    <>
      <PageSubTitle>Vérifiez votre boîte mail</PageSubTitle>

      <TextBody className="text-balance">
        Si un profil LocProof est associé à cette adresse, vous recevrez un
        email contenant votre lien d’accès.
      </TextBody>

      <TextBody className="text-balance">
        Pensez à vérifier vos courriers indésirables si vous ne recevez rien
        dans quelques minutes.
      </TextBody>
    </>
  )
}
