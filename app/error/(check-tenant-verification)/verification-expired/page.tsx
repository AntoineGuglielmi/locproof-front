import AppLayout from '@/shared/components/layout/app-layout'
import PageErrorState from '@/shared/components/layout/page-error-state'

type VerificationExpiredPageProps = {
  params: Promise<void>
}

export const metadata = {
  title: 'Lien de vérification expiré | LocProof',
  description:
    'Le lien de vérification que vous avez utilisé a expiré. Veuillez demander un nouveau lien pour continuer.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function VerificationExpiredPage({}: VerificationExpiredPageProps) {
  return (
    <AppLayout>
      <PageErrorState
        title="Lien de vérification expiré"
        description="Le lien de vérification que vous avez utilisé a expiré. Veuillez demander un nouveau lien pour continuer."
      />
    </AppLayout>
  )
}
