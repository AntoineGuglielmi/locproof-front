/* eslint-disable react/no-unescaped-entities */
import AppLayout from '@/shared/components/layout/app-layout'
import { rentalRepository } from '@/repositories/rental.repository'
import MotionDiv from '@/shared/components/layout/motion-div'
import { tenantRepository } from '@/repositories/tenant.repository'
import CreateReferenceForm from '@/features/CreateReference/components/create-reference-form'
import PageMainTitle from '@/shared/components/headings/page-main-title'
import TextBody from '@/shared/components/text/text-body'

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
  const rental = await rentalRepository.findByRentalToken(rentalToken)

  if (!rental) {
    return (
      <AppLayout>
        <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PageMainTitle version="small">Location introuvable</PageMainTitle>
            <p className="text-gray-600">
              Le lien que vous avez utilisé est invalide. Veuillez vérifier
              votre email et réessayer.
            </p>
          </MotionDiv>
        </section>
      </AppLayout>
    )
  }

  if (rental.state === 'validated') {
    return (
      <AppLayout>
        <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PageMainTitle version="small">Location déjà validée</PageMainTitle>
            <p className="text-gray-600">
              Cette location a déjà été validée. Si vous pensez qu'il s'agit
              d'une erreur, veuillez contacter notre support.
            </p>
          </MotionDiv>
        </section>
      </AppLayout>
    )
  }

  const tenant = await tenantRepository.findBydDocumentId(
    rental.tenantDocumentId,
  )
  const { address, startDate, endDate, documentId: rentalDocumentId } = rental

  const { firstname, lastname } = tenant!

  return (
    <AppLayout>
      <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
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
        </MotionDiv>
      </section>

      <p className="text-xs text-center text-gray-400 mt-6">
        Aucun compte requis • Réponse en moins d’une minute
      </p>
    </AppLayout>
  )
}
