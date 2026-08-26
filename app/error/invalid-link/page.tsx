import AppLayout from '@/shared/components/layout/app-layout'
import PageErrorState from '@/shared/components/layout/page-error-state'

type InvalidLinkProps = {
  params: Promise<void>
}

export const metadata = {
  title: 'Lien invalid | LocProof',
  description:
    'Le lien que vous avez utilisé est invalide. Veuillez vérifier le lien ou demander un nouveau lien.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function InvalidLinknPage({}: InvalidLinkProps) {
  return (
    <AppLayout>
      <PageErrorState
        title="Lien invalide"
        description="Le lien que vous avez utilisé est invalide. Veuillez vérifier le lien ou demander un nouveau lien."
      />
    </AppLayout>
  )
}
