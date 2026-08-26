import AppLayout from '@/shared/components/layout/app-layout'
import PageErrorState from '@/shared/components/layout/page-error-state'

type RentalExpiredPageProps = {
  params: Promise<void>
}

export const metadata = {
  title: 'Lien de demande de référence expiré | LocProof',
  description:
    'Le lien de demande de référence que vous avez utilisé a expiré. Veuillez demander un nouveau lien pour continuer.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RentalExpiredPage({}: RentalExpiredPageProps) {
  return (
    <AppLayout>
      <PageErrorState
        title="Lien de demande de référence expiré"
        description="Le lien de demande de référence que vous avez utilisé a expiré. Veuillez demander un nouveau lien pour continuer."
      />
    </AppLayout>
  )
}
