/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import { dateShort } from '@/lib/date'
import { ucfirst } from '@/lib/string'
import MotionDiv from '@/shared/components/layout/motion-div'
import { Reference, Rental, Tenant } from '@/types/strapi-types'
import { useState } from 'react'
import { ActionSubmitValidateRental } from './actions'
import { Textarea } from '@/components/ui/textarea'
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Link from 'next/link'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'

type ValidateFormProps = {
  address: Rental['address']
  startDate: Rental['startDate']
  endDate: Rental['endDate']
  firstname: Tenant['firstname']
  lastname: Tenant['lastname']
  rentalDocumentId: Rental['documentId']
}

type ReferenceAnswer = 'yes' | 'no' | 'skip'

type Question = {
  legend: string
  description?: string
  name: string
  onChange: (value: ReferenceAnswer) => void
}

export default function ValidateForm({
  address,
  endDate,
  firstname,
  lastname,
  startDate,
  rentalDocumentId,
}: ValidateFormProps) {
  const [paidOnTime, setRentPaidOnTime] = useState<
    Reference['paidOnTime'] | null
  >(null)
  const [wellMaintained, setWellMaintained] = useState<
    Reference['wellMaintained'] | null
  >(null)
  const [communication, setGoodCommunication] = useState<
    Reference['communication'] | null
  >(null)
  const [recommended, setWouldRecommend] = useState<
    Reference['recommended'] | null
  >(null)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const startDateShort = ucfirst(dateShort(startDate!))
  const endDateShort = ucfirst(dateShort(endDate!))

  const questions: Question[] = [
    {
      legend: 'Les loyers ont-ils été payés à temps',
      name: 'rentPaidOnTime',
      onChange: setRentPaidOnTime,
    },
    {
      legend: 'Le logement a-t-il été bien entretenu',
      description: `Tenez compte uniquement des dégradations anormales.`,
      name: 'wellMaintained',
      onChange: setWellMaintained,
    },
    {
      legend: 'La communication était-elle fluide',
      name: 'goodCommunication',
      onChange: setGoodCommunication,
    },
    {
      legend: `Recommanderiez-vous ce locataire à d'autres bailleurs`,
      description: `Vous pouvez choisir “Je ne souhaite pas répondre”.`,
      name: 'wouldRecommend',
      onChange: setWouldRecommend,
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      paidOnTime === null ||
      wellMaintained === null ||
      communication === null ||
      recommended === null
    ) {
      alert('Veuillez répondre à toutes les questions')
      return
    }

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
    setFormSubmitted(true)
  }

  return (
    <section className="max-w-xl mx-auto px-6">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-6"
      >
        <div className="text-sm text-gray-600 leading-relaxed text-balance">
          {firstname} {lastname} vous a demandé de confirmer une ancienne
          location via LocProof.
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-700">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <MapPin
                size={14}
                className="text-indigo-500"
              />{' '}
              {address}
            </div>
            <div className="flex gap-2 items-center">
              <Calendar
                size={14}
                className="text-indigo-500"
              />{' '}
              {startDateShort} <ArrowRight size={14} /> {endDateShort}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          Vos réponses restent privées.
          <br /> Le locataire verra uniquement une recommandation synthétique.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          {questions.map(({ legend, name, description, onChange }) => {
            const idYes = `${name}-yes`
            const idNo = `${name}-no`
            const idSkip = `${name}-skip`
            return (
              <FieldSet
                key={name}
                className="w-full text-gray-800"
                name={name}
              >
                <FieldLegend variant="label">{legend} ?</FieldLegend>
                {description && (
                  <FieldDescription>{description}</FieldDescription>
                )}
                <RadioGroup>
                  <Field
                    orientation="horizontal"
                    className="cursor-pointer rounded-md px-2 py-1 bg-gray-50"
                    onChange={() => onChange('yes')}
                  >
                    <RadioGroupItem
                      value={idYes}
                      id={idYes}
                      className="cursor-pointer"
                    />
                    <FieldLabel
                      htmlFor={idYes}
                      className="font-normal cursor-pointer"
                    >
                      Oui
                    </FieldLabel>
                  </Field>
                  <Field
                    orientation="horizontal"
                    className="cursor-pointer rounded-md px-2 py-1 bg-gray-50"
                    onChange={() => onChange('no')}
                  >
                    <RadioGroupItem
                      value={idNo}
                      id={idNo}
                      className="cursor-pointer"
                    />
                    <FieldLabel
                      htmlFor={idNo}
                      className="font-normal cursor-pointer"
                    >
                      Non
                    </FieldLabel>
                  </Field>
                  <Field
                    orientation="horizontal"
                    className="cursor-pointer rounded-md px-2 py-1 bg-gray-50"
                    onChange={() => onChange('skip')}
                  >
                    <RadioGroupItem
                      value={idSkip}
                      id={idSkip}
                      className="cursor-pointer"
                    />
                    <FieldLabel
                      htmlFor={idSkip}
                      className="font-normal text-muted-foreground cursor-pointer"
                    >
                      Je ne souhaite pas répondre
                    </FieldLabel>
                  </Field>
                </RadioGroup>
              </FieldSet>
            )
          })}

          <Field>
            <FieldLabel>Commentaire (optionnel)</FieldLabel>
            <Textarea
              placeholder="Ajouter un contexte si vous le souhaitez"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Field>

          <div className="bg-indigo-50/20 border border-indigo-100/50 rounded-2xl p-4 text-xs text-indigo-700">
            <p>
              Vous confirmez avoir été le bailleur de ce logement durant cette
              période.
            </p>

            <p className="mt-1">
              Vos réponses resteront privées et seront utilisées uniquement pour
              générer une recommandation locative synthétique, conformément à
              notre{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-2"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </div>

          <Button
            disabled={loading || formSubmitted}
            className="mt-4 py-4 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-transform hover:scale-[1.02]"
          >
            {loading ? 'Enregistrement...' : 'Envoyer mon retour'}
          </Button>

          {formSubmitted && (
            <p className="text-green-600 text-center mt-4">
              Merci pour votre recommandation ! Si vous avez des commentaires ou
              des questions, n'hésitez pas à nous contacter. Vous pouvez fermer
              cette page en toute sécurité.
            </p>
          )}
        </form>
      </MotionDiv>
    </section>
  )
}
