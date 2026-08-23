import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'

type NoVerificationPageProps = {
  params: Promise<void>
}

export const metadata = {
  title: 'Demande introuvable | LocProof',
  description:
    'Aucune demande de recommandation n’a été trouvée pour ce lien. Veuillez vérifier le lien ou en demander un nouveau.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NoVerificationTokenPage({}: NoVerificationPageProps) {
  return (
    <AppLayout>
      <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Demande invalide
            </h1>

            <p className="text-gray-600 mb-8">
              Aucune demande de recommandation n’a été trouvée. Veuillez
              demander un nouveau lien de vérification.
            </p>
          </div>
        </MotionDiv>
      </section>
    </AppLayout>
  )
}
