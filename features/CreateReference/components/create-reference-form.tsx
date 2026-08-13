'use client'

import { dateShort } from '@/shared/lib/date'
import { ucfirst } from '@/lib/string'
import MotionDiv from '@/shared/components/layout/motion-div'
import { useState } from 'react'
import { Textarea } from '@/shared/components/shadcn/ui/textarea'
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/shared/components/shadcn/ui/field'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/shared/components/shadcn/ui/radio-group'
import Link from 'next/link'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { ActionCreateReference } from '../actions/ActionCreateReference'
import { Rental, Tenant } from '@/shared/types/strapi-types'
import { TypeQuestion } from '../types/TypeQuestion'
import { Controller, useForm } from 'react-hook-form'
import { createReferenceSchema } from '../schemas/create-reference-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import AnimatedFieldError from '@/shared/components/form/animated-field-error'
import { TypeCreateReferenceFormValues } from '../types/TypeCreateReferenceFormValues'
import CreateReferenceFormSuccess from './create-reference-form-success'
import Button from '@/shared/components/form/button'
import Panel from '@/shared/components/text/panel'

type ValidateFormProps = {
  address: Rental['address']
  startDate: Rental['startDate']
  endDate: Rental['endDate']
  firstname: Tenant['firstname']
  lastname: Tenant['lastname']
  rentalDocumentId: Rental['documentId']
}

export default function CreateReferenceForm({
  address,
  endDate,
  firstname,
  lastname,
  startDate,
  rentalDocumentId,
}: ValidateFormProps) {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const form = useForm<TypeCreateReferenceFormValues>({
    resolver: zodResolver(createReferenceSchema),
    defaultValues: {
      paidOnTime: undefined,
      wellMaintained: undefined,
      communication: undefined,
      recommended: undefined,
      comment: '',
      rentalDocumentId,
    },
  })

  const startDateShort = ucfirst(dateShort(startDate!))
  const endDateShort = ucfirst(dateShort(endDate!))

  const questions: TypeQuestion[] = [
    {
      legend: 'Les loyers ont-ils été payés à temps',
      name: 'paidOnTime',
    },
    {
      legend: 'Le logement a-t-il été bien entretenu',
      description: 'Tenez compte uniquement des dégradations anormales.',
      name: 'wellMaintained',
    },
    {
      legend: 'La communication était-elle fluide',
      name: 'communication',
    },
    {
      legend: "Recommanderiez-vous ce locataire à d'autres bailleurs",
      description: 'Vous pouvez choisir « Je ne souhaite pas répondre ».',
      name: 'recommended',
    },
  ]

  const onSubmit = async (values: TypeCreateReferenceFormValues) => {
    const result = await ActionCreateReference(values)
    if (!result.success) {
      form.setError('root', {
        message: result.error,
      })
      return
    }
    setFormSubmitted(true)
  }

  if (formSubmitted) {
    return (
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-6"
      >
        <CreateReferenceFormSuccess />
      </MotionDiv>
    )
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-6"
    >
      <div className="text-sm text-gray-600 leading-relaxed text-balance">
        <strong className="text-indigo-700">
          {firstname} {lastname}
        </strong>{' '}
        vous a demandé de confirmer une ancienne location via LocProof.
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        {questions.map(({ legend, name, description }) => {
          const idYes = `${name}-yes`
          const idNo = `${name}-no`
          const idSkip = `${name}-skip`

          return (
            <Controller
              key={name}
              control={form.control}
              name={name}
              render={({ field, fieldState }) => (
                <FieldSet
                  className="w-full text-gray-800"
                  name={name}
                >
                  <FieldLegend
                    className={`text-left ${!!form.formState.errors[name] ? 'text-destructive' : ''}`}
                    variant="label"
                    data-invalid={!!form.formState.errors[name]}
                  >
                    {legend} ?
                  </FieldLegend>

                  {description && (
                    <FieldDescription>{description}</FieldDescription>
                  )}

                  <RadioGroup
                    value={field.value ?? ''}
                    onValueChange={field.onChange}
                  >
                    <Field
                      orientation="horizontal"
                      className="cursor-pointer rounded-md px-2 py-1 bg-gray-50"
                    >
                      <RadioGroupItem
                        value="yes"
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
                    >
                      <RadioGroupItem
                        value="no"
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
                    >
                      <RadioGroupItem
                        value="skip"
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

                  {fieldState.error && (
                    <AnimatedFieldError error={fieldState.error} />
                  )}
                </FieldSet>
              )}
            />
          )
        })}

        <Field data-invalid={!!form.formState.errors.comment}>
          <FieldLabel>Commentaire (optionnel)</FieldLabel>
          <Textarea
            placeholder="Ajouter un contexte si vous le souhaitez"
            {...form.register('comment')}
          />
        </Field>

        <Panel
          title="Vous confirmez avoir été le bailleur de ce logement durant cette
            période."
          body={
            <>
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
            </>
          }
          type="info"
        />

        <AnimatedFieldError error={form.formState.errors.root} />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? 'Enregistrement...'
            : 'Envoyer mon retour'}
        </Button>
      </form>
    </MotionDiv>
  )
}
