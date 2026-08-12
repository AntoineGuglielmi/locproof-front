import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'
import CreateReferenceForm from '@/features/CreateReference/components/create-reference-form'
import PageMainTitle from '@/shared/components/headings/page-main-title'
import TextBody from '@/shared/components/text/text-body'
import { ServiceGetPageContext } from '@/features/CreateReference/services/ServiceGetPageContext'
import PageErrorState from '@/shared/components/layout/page-error-state'
import { Narrow } from '@/shared/components/layout/grid'

type ValidatePageProps = {
  params: Promise<{
    rentalToken: string
  }>
}

export const metadata = {
  title: 'Validation de location | LocProof',
  description:
    'Confirmez en quelques secondes l’expérience locative d’un ancien locataire via un lien sécurisé LocProof.',
  robots: {
    index: false,
    follow: false,
    noindex: true,
    nofollow: true,
  },
  openGraph: {
    title: 'Validation de location | LocProof',
    description:
      'Confirmez l’expérience locative d’un ancien locataire en quelques secondes.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary',
    title: 'Validation de location | LocProof',
    description:
      'Répondez à une demande de recommandation locative en moins d’une minute.',
  },
  alternates: {
    canonical: 'https://locproof.fr/validate',
  },
}

export default async function ValidatePage({ params }: ValidatePageProps) {
  const { rentalToken } = await params

  const pageContext = await ServiceGetPageContext(rentalToken)

  const { status } = pageContext

  if (status === 'not-found') {
    return (
      <AppLayout>
        <PageErrorState
          title="Location introuvable"
          description="Le lien que vous avez utilisé est invalide. Veuillez vérifier
              votre email et réessayer."
        />
      </AppLayout>
    )
  }

  if (status === 'validated') {
    return (
      <AppLayout>
        <PageErrorState
          title="Location déjà validée"
          description="Cette location a déjà été validée. Si vous pensez qu'il s'agit
              d'une erreur, veuillez contacter notre support."
        />
      </AppLayout>
    )
  }

  if (status === 'expired') {
    return (
      <AppLayout>
        <PageErrorState
          title="Lien expiré"
          description="Ce lien de validation n'est plus valide. Si vous pensez qu'il s'agit d'une erreur, veuillez contacter notre support."
        />
      </AppLayout>
    )
  }

  if (status === 'tenant-not-found') {
    return (
      <AppLayout>
        <PageErrorState
          title="Locataire introuvable"
          description="Le locataire à l'origine de la demande est introuvable. Si vous pensez qu'il s'agit
              d'une erreur, veuillez contacter notre support."
        />
      </AppLayout>
    )
  }

  const { tenant, rental } = pageContext

  const { address, startDate, endDate, documentId: rentalDocumentId } = rental

  const { firstname, lastname } = tenant

  return (
    <AppLayout>
      <Narrow className="text-center pt-16 pb-10">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PageMainTitle version="small">
            Confirmer cette location
          </PageMainTitle>
          <TextBody className="text-balance mb-8">
            Cela vous prendra moins de 30 secondes
          </TextBody>

          <CreateReferenceForm
            {...{
              address,
              startDate,
              endDate,
              firstname,
              lastname,
              rentalDocumentId,
            }}
          />

          <p className="text-xs text-center text-gray-400 mt-6">
            Aucun compte requis • Réponse en moins d’une minute
          </p>
        </MotionDiv>
      </Narrow>
    </AppLayout>
  )
}
