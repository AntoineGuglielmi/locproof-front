'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { dateShort } from '@/lib/date'
import { ucfirst } from '@/lib/string'
import MotionDiv from '@/shared/components/layout/motion-div'
import { Rental, Tenant } from '@/types/strapi-types'
import { useState } from 'react'
import { ActionSubmitValidateRental } from './actions'

type ValidateFormProps = {
  address: Rental['address']
  startDate: Rental['startDate']
  endDate: Rental['endDate']
  firstname: Tenant['firstname']
  lastname: Tenant['lastname']
  rentalDocumentId: Rental['documentId']
}

export default function ValidateForm({
  address,
  endDate,
  firstname,
  lastname,
  startDate,
  rentalDocumentId,
}: ValidateFormProps) {
  const [paidOnTime, setRentPaidOnTime] = useState(false)
  const [wellMaintained, setWellMaintained] = useState(false)
  const [communication, setGoodCommunication] = useState(false)
  const [recommended, setWouldRecommend] = useState(false)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const startDateShort = ucfirst(dateShort(startDate!))
  const endDateShort = ucfirst(dateShort(endDate!))

  const questions = [
    {
      question: 'Les loyers ont-ils été payés à temps',
      name: 'rentPaidOnTime',
      onChange: (value: boolean) => setRentPaidOnTime(value),
    },
    {
      question: 'Le logement a-t-il été bien entretenu',
      name: 'wellMaintained',
      onChange: (value: boolean) => setWellMaintained(value),
    },
    {
      question: 'La communication était-elle fluide',
      name: 'goodCommunication',
      onChange: (value: boolean) => setGoodCommunication(value),
    },
    {
      question: `Recommanderiez-vous ce locataire à d'autres bailleurs`,
      name: 'wouldRecommend',
      onChange: (value: boolean) => setWouldRecommend(value),
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await ActionSubmitValidateRental({
      paidOnTime,
      wellMaintained,
      communication,
      recommended,
      comment,
      rentalDocumentId,
    })
    setLoading(false)
  }

  return (
    <section className="max-w-xl mx-auto px-6 pb-20">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-6"
      >
        <div className="text-sm text-gray-500">
          {firstname} {lastname} a indiqué avoir loué votre bien :
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-700">
          📍 {address}
          <br />
          📅 {startDateShort} → {endDateShort}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          {questions.map(({ question, name, onChange }) => (
            <div
              key={name}
              className="flex flex-col gap-2"
            >
              <span className="text-gray-800">{question} ?</span>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={name}
                    onChange={() => onChange(true)}
                  />
                  Oui
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={name}
                    onChange={() => onChange(false)}
                  />
                  Non
                </label>
              </div>
            </div>
          ))}
          <Input
            placeholder="Commentaire (optionnel)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button className="mt-4 py-4 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-transform hover:scale-[1.02]">
            {loading ? 'Enregistrement...' : 'Valider la recommandation'}
          </Button>
        </form>
      </MotionDiv>
    </section>
  )
}
