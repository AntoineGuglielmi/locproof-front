import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'
import { tenantRepository } from '@/repositories/tenant.repository'
import { redirect } from 'next/navigation'
import CopyProfileLink from './copy-profile-link'
import { EntityTenantSynthesis } from '@/shared/entities/EntityTenantSynthesis'
import { percentage } from '@/lib/string'
import List from '@/shared/components/list/List'
import ReferenceItem from '@/features/Profile/components/reference-item'
import Link from 'next/link'

type ProfilePageProps = {
  params: Promise<{
    slug: string
  }>
}

export const metadata = {
  title: 'Profil locataire vérifié | LocProof',
  description:
    'Consultez un profil locataire vérifié avec ses recommandations d’anciens bailleurs et son historique de location.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Profil locataire vérifié | LocProof',
    description:
      'Découvrez les recommandations et l’historique d’un locataire vérifié sur LocProof.',
    type: 'website',
    siteName: 'LocProof',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profil locataire vérifié | LocProof',
    description:
      'Profil locataire avec recommandations vérifiées par des bailleurs.',
  },
  alternates: {
    canonical: 'https://locproof.fr/profile',
  },
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params
  const tenant = await tenantRepository.findBySlug(slug)

  if (!tenant) {
    return redirect('/error/no-profile')
  }

  const tenantSynthesis = new EntityTenantSynthesis(tenant)
  const synthesis = await tenantSynthesis.getSynthesis()

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
            {
              label: 'Loyers payés',
              value: percentage(synthesis.scores.paidOnTime),
            },
            {
              label: 'Entretien',
              value: percentage(synthesis.scores.wellMaintained),
            },
            {
              label: 'Communication',
              value: percentage(synthesis.scores.communication),
            },
            {
              label: 'Recommandé',
              value: percentage(synthesis.scores.recommended),
            },
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

          {synthesis.references.length > 0 ? (
            <List
              items={synthesis.references}
              getKey={(item) => item.id}
              renderItem={ReferenceItem}
              className="flex flex-col gap-4"
            />
          ) : (
            <>
              <p className="text-gray-600 text-center">
                Ce profil est en cours de constitution.
              </p>

              <p className="text-gray-500 text-sm text-center mt-2">
                Les premières recommandations vérifiées permettront de renforcer
                sa crédibilité auprès des bailleurs.
              </p>
              <Link
                href="/validate-email"
                className="text-indigo-600 text-sm font-medium block text-center mt-4"
              >
                Demander une première recommandation
              </Link>
            </>
          )}
        </MotionDiv>
      </section>

      <section className="text-center pb-20">
        <CopyProfileLink>Copier le lien du profil</CopyProfileLink>
      </section>
    </AppLayout>
  )
}
