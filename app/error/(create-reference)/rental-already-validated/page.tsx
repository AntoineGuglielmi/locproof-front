/* eslint-disable react/no-unescaped-entities */
import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'

type RentalAlreadyValidatedPageProps = {
  params: Promise<void>
}

export const metadata = {
  title: 'Location déjà validée | LocProof',
  description:
    'Cette location a déjà été validée via LocProof. Aucun nouvel avis ne peut être soumis pour cette demande.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RentalAlreadyValidatedPage({}: RentalAlreadyValidatedPageProps) {
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
              Location déjà validée
            </h1>

            <p className="text-gray-600 mb-8">
              Cette location a déjà été validée. Si vous pensez qu'il s'agit
              d'une erreur, veuillez contacter le support.
            </p>
          </div>
        </MotionDiv>
      </section>
    </AppLayout>
  )
}
