/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/components/ui/button'
import AppLayout from '@/shared/components/layout/app-layout'
import Link from 'next/link'
import MotionDiv from '@/shared/components/layout/motion-div'

export default function HomePage() {
  return (
    <AppLayout>
      {/* HERO */}
      <section className="text-center px-6 py-20 max-w-4xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 px-4 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
            🔒 Recommandations vérifiées
          </span>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Louer en confiance, des deux côtés
          </h1>

          <p className="text-xl text-gray-700 mb-4">
            Locataires et bailleurs gagnent en visibilité et en sérénité
          </p>

          <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
            Les locataires valorisent leur sérieux. Les bailleurs prennent des
            décisions plus éclairées grâce à des retours vérifiés.
          </p>

          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <Button
              asChild
              className="px-8 py-4 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700"
            >
              <Link href="/create/me">Je suis locataire</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="px-8 py-4 text-lg rounded-2xl"
            >
              <a href="/example">Je suis bailleur</a>
            </Button>
          </div>
        </MotionDiv>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-12 text-center text-gray-500 text-sm">
        Pensé pour simplifier la relation entre locataires et bailleurs
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        {[
          {
            title: 'Simple',
            desc: 'Créez un dossier en quelques minutes, sans friction',
          },
          {
            title: 'Fiable',
            desc: 'Des recommandations validées directement par les bailleurs',
          },
          {
            title: 'Utile',
            desc: 'Un signal concret pour mieux évaluer un profil locataire',
          },
        ].map((item, i) => (
          <MotionDiv
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </MotionDiv>
        ))}
      </section>

      {/* MICRO STORY */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="p-8 rounded-2xl border bg-gray-50">
            <p className="text-gray-700 leading-relaxed">
              "J’ai loué mon bien à quelqu’un avec un dossier impeccable… et ça
              s’est très mal passé. Avec le recul, un simple retour d’un ancien
              bailleur aurait pu faire la différence."
            </p>
            <p className="mt-4 text-sm text-gray-500">
              — Expérience réelle de bailleur
            </p>
          </div>
        </div>
      </section>

      {/* PROFILE PREVIEW */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold">
            À quoi ressemble un profil ?
          </h2>
          <p className="mt-4 text-gray-600">
            Un aperçu simple pour comprendre rapidement un locataire.
          </p>

          <div className="mt-12 p-6 bg-white rounded-2xl border shadow-sm text-left max-w-2xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Martin Dupont</p>
                <p className="text-sm text-gray-500">Locataire</p>
              </div>
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                1 recommandation
              </span>
            </div>

            <div className="mt-6 border-t pt-4">
              <p className="text-sm text-gray-500">Ancien bailleur</p>
              <p className="font-medium mt-1">Location 2022 - 2024</p>

              <ul className="mt-3 text-gray-700 space-y-1">
                <li>✔ Loyers payés régulièrement</li>
                <li>✔ Logement bien entretenu</li>
                <li>✔ Communication fluide</li>
              </ul>

              <p className="mt-4 text-gray-600 italic">
                “Locataire sérieux et respectueux, aucun problème durant la
                location.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-bold mb-6">
          Prêt à faire la différence ?
        </h2>
        <Button
          asChild
          className="px-10 py-5 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700"
        >
          <Link href="/create">Créer mon dossier LocProof</Link>
        </Button>
      </section>
    </AppLayout>
  )
}
