'use client'

import AppLayout from '@/shared/components/layout/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

type ValidatePageProps = {
  params: Promise<void>
}

export default function ValidatePage({}: ValidatePageProps) {
  return (
    <AppLayout>
      <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">Confirmer cette location</h1>
          <p className="text-gray-600">
            Cela vous prendra moins de 30 secondes
          </p>
        </motion.div>
      </section>

      <section className="max-w-xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-6"
        >
          <div className="text-sm text-gray-500">
            Martin Dupont a indiqué avoir loué votre bien :
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-700">
            📍 12 rue des Lilas
            <br />
            📅 Jan 2022 → Mars 2024
          </div>

          {[
            'Les loyers ont-ils été payés à temps',
            'Le logement a-t-il été bien entretenu',
            'La communication était-elle fluide',
            `Recommanderiez-vous ce locataire à d'autres bailleurs`,
          ].map((q, i) => (
            <div
              key={i}
              className="flex flex-col gap-2"
            >
              <span className="text-gray-800">{q} ?</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={q}
                  />{' '}
                  Oui
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={q}
                  />{' '}
                  Non
                </label>
              </div>
            </div>
          ))}

          <Input placeholder="Commentaire (optionnel)" />

          <Button className="mt-4 py-4 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-transform hover:scale-[1.02]">
            Valider la recommandation
          </Button>
        </motion.div>
      </section>
    </AppLayout>
  )
}
