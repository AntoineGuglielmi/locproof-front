/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/components/ui/button'
import AppLayout from '@/shared/components/layout/app-layout'
import MotionDiv from '@/shared/components/layout/motion-div'
import Link from 'next/link'

type ExamplePageProps = {
  params: Promise<void>
}

export const metadata = {
  title: 'Exemple de profil locataire | LocProof',
  description:
    'Découvrez à quoi ressemble un profil locataire vérifié sur LocProof : recommandations d’anciens bailleurs, historique de location et retours fiables.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Exemple de profil locataire | LocProof',
    description:
      'Voyez à quoi ressemble un profil locataire vérifié avec recommandations d’anciens bailleurs.',
    url: 'https://locproof.fr/example',
    siteName: 'LocProof',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exemple de profil locataire | LocProof',
    description:
      'Découvrez un exemple de profil locataire vérifié avec recommandations de bailleurs.',
  },
  alternates: {
    canonical: 'https://locproof.fr/example',
  },
}

export default function ExamplePage({}: ExamplePageProps) {
  return (
    <AppLayout>
      <div className="bg-indigo-100 text-indigo-800 text-sm text-center py-2">
        Exemple de profil LocProof — données fictives
      </div>

      <section className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500" />

          <div>
            <h1 className="text-3xl font-bold">Martin Dupont</h1>
            <p className="text-green-600 font-medium mt-1">
              ✔ Profil LocProof vérifié
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Ce profil peut être partagé avec un bailleur en un clic
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
            { label: 'Loyers payés', value: '95%' },
            { label: 'Entretien', value: 'Très bon' },
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

      <section className="max-w-4xl mx-auto px-6 pb-16">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-2xl font-semibold">Références</h2>

          {/* Reference 1 */}
          <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col gap-4">
            <div className="text-sm text-gray-500">📍 12 rue des Lilas</div>
            <div className="text-sm text-gray-500">📅 Jan 2022 → Mars 2024</div>

            <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
              <p>✔ Loyers majoritairement payés à temps</p>
              <p>✔ Logement bien entretenu</p>
              <p>✔ Communication fluide</p>
              <p>✔ Recommandé</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl text-gray-700 italic">
              "Très bon locataire. Quelques retards ponctuels mais toujours
              régularisés rapidement."
            </div>

            <div className="text-xs text-gray-400">
              Recommandation vérifiée par un bailleur
            </div>
          </div>

          {/* Reference 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col gap-4">
            <div className="text-sm text-gray-500">📍 8 avenue Victor Hugo</div>
            <div className="text-sm text-gray-500">📅 Juin 2020 → Déc 2021</div>

            <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
              <p>✔ Loyers payés à temps</p>
              <p>✔ Logement très bien entretenu</p>
              <p>✔ Communication excellente</p>
              <p>✔ Recommandé</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl text-gray-700 italic">
              "Locataire sérieux, respectueux et très agréable dans les
              échanges."
            </div>

            <div className="text-xs text-gray-400">
              Recommandation vérifiée par un bailleur
            </div>
          </div>
        </MotionDiv>
      </section>

      <section className="text-center pb-20">
        <h2 className="text-2xl font-semibold mb-4">
          Et si c'était votre profil ?
        </h2>
        <Button
          asChild
          className="px-8 py-4 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700"
        >
          <Link href="/create/me">Créer mon dossier LocProof</Link>
        </Button>
      </section>
    </AppLayout>
  )
}
