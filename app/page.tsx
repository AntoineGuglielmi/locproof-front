'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import AppLayout from '@/shared/components/layout/app-layout'
import Link from 'next/link'

export default function Home() {
  return (
    <AppLayout>
      <section className="text-center px-6 py-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 px-4 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
            🔒 Recommandations vérifiées
          </span>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Louez en confiance
          </h1>

          <p className="text-xl text-gray-700 mb-4">
            Prouvez que vous êtes un locataire de confiance
          </p>

          <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
            Au-delà des documents, LocProof permet de partager des
            recommandations réelles de vos anciens bailleurs.
          </p>

          <div className="flex justify-center gap-4">
            <Button
              asChild
              className="px-8 py-4 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700"
            >
              <Link href="/create">Créer mon dossier</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="px-8 py-4 text-lg rounded-2xl"
            >
              <Link href="/example">Voir un exemple</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-12 text-center text-gray-500 text-sm">
        Utilisé par des locataires et bailleurs partout en France
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        {[
          {
            title: 'Simple',
            desc: 'Créez votre dossier en quelques minutes, sans complexité',
          },
          {
            title: 'Fiable',
            desc: 'Des recommandations validées directement par vos bailleurs',
          },
          {
            title: 'Partageable',
            desc: 'Envoyez votre profil en un lien lors de vos recherches',
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
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
