import AppLayout from '@/shared/components/layout/app-layout'
import PageErrorState from '@/shared/components/layout/page-error-state'

type RentalAlreadyValidatedPageProps = {
  params: Promise<void>
}

export const metadata = {
  title: 'Demande de référence déjà traitée | LocProof',
  description:
    'Cette demande de référence a déjà été traitée. Si vous pensez qu’il s’agit d’une erreur, veuillez contacter le support.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RentalAlreadyValidatedPage({}: RentalAlreadyValidatedPageProps) {
  return (
    <AppLayout>
      <PageErrorState
        title="Demande de référence déjà traitée"
        description="Cette demande de référence a déjà été traitée. Si vous pensez qu’il s’agit d’une erreur, veuillez contacter le support."
      />
    </AppLayout>
  )
}
