import AppLayout from '@/shared/components/layout/app-layout'
import PageErrorState from '@/shared/components/layout/page-error-state'

type NoVerificationPageProps = {
  params: Promise<void>
}

export const metadata = {
  title: 'Service temporairement indisponible | LocProof',
  description:
    'Aucune demande de Une erreur est survenue lors du traitement de votre demande. Veuillez réessayer dans quelques instants.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function UnavailablePage({}: NoVerificationPageProps) {
  return (
    <AppLayout>
      <PageErrorState
        title="Service temporairement indisponible"
        description="Une erreur est survenue lors du traitement de votre demande. Veuillez réessayer dans quelques instants."
      />
    </AppLayout>
  )
}
