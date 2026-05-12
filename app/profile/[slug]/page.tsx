/* eslint-disable react/no-unescaped-entities */
import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'
import { tenantRepository } from '@/repositories/tenant.repository'
import { redirect } from 'next/navigation'
import CopyProfileLink from './copy-profile-link'
import { EntityTenantSynthesis } from '@/shared/entities/EntityTenantSynthesis'
import { percentage } from '@/lib/string'
import { Check } from 'lucide-react'

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

  const tenantSynthesis = new EntityTenantSynthesis(tenant)
  const synthesis = await tenantSynthesis.getSynthesis()

  const scoresDisplay = [
    {
      name: 'paidOnTime',
      label: 'Loyers payés à temps',
    },
    {
      name: 'wellMaintained',
      label: 'Logement bien entretenu',
    },
    {
      name: 'communication',
      label: 'Communication fluide',
    },
    {
      name: 'recommended',
      label: 'Recommandé',
    },
  ] as const

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

          {synthesis.references.map((reference) => (
            <div
              key={reference.id}
              className="bg-white rounded-3xl p-6 shadow-md flex flex-col gap-4"
            >
              <div className="text-sm text-gray-500">
                📍 {reference.cityPublic}
              </div>
              <div className="text-sm text-gray-500">
                📅 {reference.startDate} → {reference.endDate}
              </div>

              <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
                {scoresDisplay.map(({ name, label }) => {
                  return reference[name] ? (
                    <p
                      key={label}
                      className="flex gap-2 items-center"
                    >
                      <Check size={16} />
                      {label}
                    </p>
                  ) : null
                })}
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl text-gray-700 italic">
                "{reference.comment}"
              </div>

              <div className="text-xs text-gray-400">
                Recommandation vérifiée par un bailleur
              </div>
            </div>
          ))}
        </MotionDiv>
      </section>

      <section className="text-center pb-20">
        <CopyProfileLink>Copier le lien du profil</CopyProfileLink>
      </section>
    </AppLayout>
  )
}
