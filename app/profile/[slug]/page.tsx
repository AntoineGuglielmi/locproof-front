/* eslint-disable react/no-unescaped-entities */
import AppLayout from '@/shared/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import MotionDiv from '@/shared/components/layout/motion-div'
import { tenantRepository } from '@/repositories/tenant.repository'
import { rentalRepository } from '@/repositories/rental.repository'
import { referenceRepository } from '@/repositories/reference.repository'
import { mergeReferenceRental } from '@/lib/referenceRental'
import { EntityReferenceRental } from '@/shared/entities/EntityReferenceRental'
import { redirect } from 'next/navigation'

type ProfilePageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params
  const tenant = await tenantRepository.findBySlug(slug)

  if (!tenant) {
    return redirect('/error/no-profile')
  }

  const { documentId } = tenant || {}

  const rentals = await rentalRepository.findByTenantDocumentId(documentId)

  const validatedRentals: Array<EntityReferenceRental> = []
  for (const rental of rentals) {
    const reference = await referenceRepository.findByRentalDocumentId(
      rental.documentId!,
    )

    if (reference) {
      const mergedRenferenceRental = mergeReferenceRental({
        reference,
        rental,
      })
      validatedRentals.push(new EntityReferenceRental(mergedRenferenceRental))
    }
  }

  return (
    <AppLayout>
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-400 to-blue-500" />

          <div>
            <h1 className="text-3xl font-bold">
              {tenant?.firstname} {tenant?.lastname}
            </h1>
            <p className="text-green-600 font-medium mt-1">
              ✔ Profil LocProof vérifié
            </p>
          </div>
        </MotionDiv>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-10">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Loyers payés', value: '100%' },
            { label: 'Entretien', value: 'Excellent' },
            { label: 'Communication', value: 'Fluide' },
            { label: 'Recommandé', value: 'Oui' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm text-center"
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="font-semibold text-lg">{item.value}</p>
            </div>
          ))}
        </MotionDiv>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-2xl font-semibold">Références</h2>

          {validatedRentals.map((entityReferenceRental) => (
            <div
              key={entityReferenceRental.documentId}
              className="bg-white rounded-3xl p-6 shadow-md flex flex-col gap-4"
            >
              <div className="text-sm text-gray-500">
                📍 {entityReferenceRental.address}
              </div>
              <div className="text-sm text-gray-500">
                📅 {entityReferenceRental.startDate} →{' '}
                {entityReferenceRental.endDate}
              </div>

              <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
                <p>✔ Loyers payés à temps</p>
                <p>✔ Logement bien entretenu</p>
                <p>✔ Communication fluide</p>
                <p>✔ Recommandé</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl text-gray-700 italic">
                "{entityReferenceRental.comment}"
              </div>

              <div className="text-xs text-gray-400">
                Recommandation vérifiée par un bailleur
              </div>
            </div>
          ))}
        </MotionDiv>
      </section>

      <section className="text-center pb-20">
        <Button className="px-8 py-4 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700">
          Copier le lien du profil
        </Button>
      </section>
    </AppLayout>
  )
}
