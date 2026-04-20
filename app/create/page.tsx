'use client'

import AppLayout from '@/shared/components/layout/app-layout'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/shared/components/form/date-picker'
import { AddressAutocomplete } from '@/shared/components/form/address-autocomplete'
import { useState } from 'react'

type CreatePageProps = {
  params: Promise<void>
}

export default function CreatePage({}: CreatePageProps) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    landlordEmail: '',
  })

  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      console.log({
        key,
        value,
      })

      if (key === 'startDate' && next.startDate) {
        if (next.endDate === undefined || next.startDate > next.endDate) {
          next.endDate = next.startDate
        }
      }

      if (key === 'endDate' && next.startDate && next.endDate) {
        if (next.endDate < next.startDate) {
          next.startDate = next.endDate
        }
      }
      console.log({
        next,
      })

      return next
    })
  }

  async function handleSubmit() {
    // 🧪 validation minimale
    if (!form.startDate || !form.endDate) {
      alert('Dates requises')
      return
    }

    if (form.startDate > form.endDate) {
      alert('Dates incohérentes')
      return
    }

    console.log({
      form,
    })

    // await ServerActionName(form)
  }

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
            <Input
              placeholder="Nom"
              value={form.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
            />
            <Input
              placeholder="Prénom"
              value={form.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
            />
          </div>

          <AddressAutocomplete
            onChange={(value) => updateField('address', value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              value={form.startDate}
              onChange={(date) => updateField('startDate', date)}
              placeholder="Date de début"
            />

            <DatePicker
              value={form.endDate}
              onChange={(date) => updateField('endDate', date)}
              placeholder="Date de fin"
            />
          </div>

          <Input
            placeholder="Email du bailleur"
            type="email"
            value={form.landlordEmail}
            onChange={(e) => updateField('landlordEmail', e.target.value)}
          />

          <p className="text-sm text-gray-500">
            Votre bailleur recevra un email simple pour confirmer votre
            location. Aucune création de compte requise.
          </p>

          <Button
            onClick={handleSubmit}
            className="mt-4 py-4 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-transform hover:scale-[1.02]"
          >
            Demander une recommandation
          </Button>
        </motion.div>
      </section>
    </AppLayout>
  )
}
