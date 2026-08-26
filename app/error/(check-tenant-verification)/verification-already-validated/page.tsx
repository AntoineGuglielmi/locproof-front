import AppLayout from '@/shared/components/layout/app-layout'
import PageErrorState from '@/shared/components/layout/page-error-state'

type VerificationNoLongerValidPageProps = {
  params: Promise<void>
}

export const metadata = {
  title: 'Lien de vérification déjà utilisé | LocProof',
  description:
    'Ce lien de vérification a déjà été utilisé. Veuillez demander un nouveau lien pour continuer.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function VerificationNoLongerValidPage({}: VerificationNoLongerValidPageProps) {
  return (
    <AppLayout>
      <PageErrorState
        title="Lien de vérification déjà utilisé"
        description="Ce lien de vérification a déjà été utilisé. Veuillez demander un nouveau lien pour continuer."
      />
    </AppLayout>
  )
}
