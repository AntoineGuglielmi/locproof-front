import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'
import CreateMeForm from './create-me-form'

type CreateMePageProps = {
  params: Promise<void>
}

export default function CreateMePage({}: CreateMePageProps) {
  return (
    <AppLayout>
      <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <span className="inline-block mb-4 px-4 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
              🔒 Vérification sécurisée
            </span>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Demandez une recommandation
            </h1>

            <p className="text-gray-600 mb-8 text-balance">
              En quelques minutes, invitez un ancien bailleur à confirmer votre
              sérieux en tant que locataire.{' '}
            </p>
          </div>

          <CreateMeForm />

          <p className="text-center text-xs text-gray-400 mt-6">
            Aucun compte requis • Lien sécurisé envoyé par email
          </p>
        </MotionDiv>
      </section>
    </AppLayout>
  )
}
