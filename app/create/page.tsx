'use client'

import AppLayout from '@/shared/components/layout/app-layout'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/shared/components/form/date-picker'
import { AddressAutocomplete } from '@/shared/components/form/address-autocomplete'

type CreatePageProps = {
  params: Promise<void>
}

export default function CreatePage({}: CreatePageProps) {
  return (
    <AppLayout>
      <section className="text-center px-6 pt-16 pb-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Créez votre dossier LocProof
          </h1>
          <p className="text-gray-600">
            En quelques minutes, demandez une recommandation à votre ancien
            bailleur
          </p>
        </motion.div>
      </section>

      {/* FORM */}
      <section className="max-w-xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-5"
        >
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Nom" />
            <Input placeholder="Prénom" />
          </div>

          <AddressAutocomplete />

          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              placeholder="Date de début"
              onChange={() => {}}
            />
            <DatePicker
              placeholder="Date de fin"
              onChange={() => {}}
            />
          </div>

          <Input placeholder="Email du bailleur" />

          <p className="text-sm text-gray-500">
            Votre bailleur recevra un email simple pour confirmer votre
            location. Aucune création de compte requise.
          </p>

          <Button className="mt-4 py-4 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-transform hover:scale-[1.02]">
            Demander une recommandation
          </Button>
        </motion.div>
      </section>
    </AppLayout>
  )
}
