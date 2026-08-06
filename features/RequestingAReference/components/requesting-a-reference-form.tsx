'use client'

import { useState } from 'react'
import { Button } from '@/shared/components/shadcn/ui/button'
import { Input } from '@/shared/components/shadcn/ui/input'
import { Tenant, TenantVerification } from '@/shared/types/strapi-types'
import { AddressAutocomplete } from '@/shared/components/form/address-autocomplete'
import { DatePicker } from '@/shared/components/form/date-picker'
import MotionDiv from '@/shared/components/layout/motion-div'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/shared/components/shadcn/ui/field'
import { ActionRequestingAReference } from '../actions/ActionRequestingAReference'
import { Controller, useForm } from 'react-hook-form'
import {
  RequestingAReferenceFormValues,
  requestingAReferenceSchema,
} from '../schemas/requesting-a-reference-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import AnimatedFieldError from '@/shared/components/form/animated-field-error'
import RequestingAReferenceFormSuccess from './requesting-a-reference-form-success'

export default function RequestingAReferenceForm(props: {
  email: Tenant['email']
  firstname: Tenant['firstname']
  lastname: Tenant['lastname']
  tenantVerificationToken: TenantVerification['tenantVerificationToken']
}) {
  const { email, firstname, lastname, tenantVerificationToken } = props

  const [formSubmitted, setFormSubmitted] = useState(false)

  const form = useForm<RequestingAReferenceFormValues>({
    resolver: zodResolver(requestingAReferenceSchema),
    defaultValues: {
      email,
      firstname,
      lastname,
      address: '',
      cityPublic: '',
      startDate: undefined,
      endDate: undefined,
      landlordEmail: '',
      tenantVerificationToken,
    },
  })

  async function onSubmit(values: RequestingAReferenceFormValues) {
    const result = await ActionRequestingAReference(values)
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
        <RequestingAReferenceFormSuccess email={email!} />
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
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldSet className="w-full">
          <FieldLegend className="text-left">Vos informations</FieldLegend>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!form.formState.errors.firstname}>
                <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
                <Input
                  id="firstname"
                  type="text"
                  placeholder="Vore prénom"
                  aria-invalid={
                    form.formState.errors.firstname ? true : undefined
                  }
                  {...form.register('firstname')}
                />
                <AnimatedFieldError error={form.formState.errors.firstname} />
              </Field>

              <Field data-invalid={!!form.formState.errors.lastname}>
                <FieldLabel htmlFor="lastname">Nom</FieldLabel>
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Votre nom"
                  aria-invalid={
                    form.formState.errors.lastname ? true : undefined
                  }
                  {...form.register('lastname')}
                />
                <AnimatedFieldError error={form.formState.errors.lastname} />
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet className="w-full">
          <FieldLegend className="text-left">Le logement concerné</FieldLegend>
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.address}>
              <FieldLabel htmlFor="address">Adresse</FieldLabel>

              <Controller
                control={form.control}
                name="address"
                render={({ field }) => (
                  <AddressAutocomplete
                    placeholder="Commencez à taper l'adresse du bien"
                    onChange={field.onChange}
                  />
                )}
              />
              <AnimatedFieldError error={form.formState.errors.address} />

              <Input
                type="hidden"
                aria-invalid={
                  form.formState.errors.cityPublic ? true : undefined
                }
                {...form.register('cityPublic')}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!form.formState.errors.startDate}>
                <FieldLabel htmlFor="firstname">
                  Date de début de location
                </FieldLabel>

                <Controller
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <DatePicker
                      placeholder="Sélectionnez une date"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <AnimatedFieldError error={form.formState.errors.startDate} />
              </Field>
              <Field data-invalid={!!form.formState.errors.endDate}>
                <FieldLabel htmlFor="lastname">
                  Date de fin de location
                </FieldLabel>

                <Controller
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      placeholder="Sélectionnez une date"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <AnimatedFieldError error={form.formState.errors.endDate} />
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>

        <FieldSeparator />

        <FieldSet className="w-full">
          <FieldLegend className="text-left">Votre bailleur</FieldLegend>
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.landlordEmail}>
              <FieldLabel htmlFor="landlordEmail">Email du bailleur</FieldLabel>
              <Input
                id="landlordEmail"
                type="email"
                placeholder="bailleur@email.com"
                aria-invalid={
                  form.formState.errors.landlordEmail ? true : undefined
                }
                {...form.register('landlordEmail')}
              />
              <AnimatedFieldError error={form.formState.errors.landlordEmail} />
            </Field>
          </FieldGroup>
        </FieldSet>

        <AnimatedFieldError error={form.formState.errors.root} />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-4 py-4 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-transform hover:scale-[1.02]"
        >
          {form.formState.isSubmitting
            ? 'Envoi en cours...'
            : 'Demander une recommandation'}
        </Button>
      </form>
    </MotionDiv>
  )
}
