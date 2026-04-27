/* eslint-disable react/no-unescaped-entities */
import AppLayout from '@/shared/components/layout/app-layout'
import { rentalRepository } from '@/repositories/rental.repository'
import MotionDiv from '@/shared/components/layout/motion-div'
import { tenantRepository } from '@/repositories/tenant.repository'
import ValidateForm from './validate-form'

type ValidatePageProps = {
  params: Promise<{
    token: string
  }>
}

export default async function ValidatePage({ params }: ValidatePageProps) {
  const { token } = await params
  const rental = await rentalRepository.findByRentalToken(token)

  if (!rental) {
    return (
      <AppLayout>
        <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Location introuvable</h1>
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
            <h1 className="text-4xl font-bold mb-4">Location déjà validée</h1>
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
          <h1 className="text-4xl font-bold mb-4">Confirmer cette location</h1>
          <p className="text-gray-600">
            Cela vous prendra moins de 30 secondes
          </p>
        </MotionDiv>
      </section>

      <ValidateForm
        {...{
          address,
          startDate,
          endDate,
          firstname,
          lastname,
          rentalDocumentId,
        }}
      />
    </AppLayout>
  )
}
