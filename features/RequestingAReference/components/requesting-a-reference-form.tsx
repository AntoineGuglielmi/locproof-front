'use client'

import { useState } from 'react'
import { Button } from '@/shared/components/shadcn/ui/button'
import { Tenant, TenantVerification } from '@/shared/types/strapi-types'
import MotionDiv from '@/shared/components/layout/motion-div'
import { FieldSeparator } from '@/shared/components/shadcn/ui/field'
import { ActionRequestingAReference } from '../actions/ActionRequestingAReference'
import { useForm } from 'react-hook-form'
import {
  RequestingAReferenceFormValues,
  requestingAReferenceSchema,
} from '../schemas/requesting-a-reference-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import AnimatedFieldError from '@/shared/components/form/animated-field-error'
import RequestingAReferenceFormSuccess from './requesting-a-reference-form-success'
import TenantInformationFields from './fields/tenant-information-fields'
import RentalInformationFields from './fields/rental-information-fields'
import LandlordInformationField from './fields/landlord-information-field'

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
      address: {
        label: '',
        city: '',
      },
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
        <TenantInformationFields form={form} />

        <FieldSeparator />

        <RentalInformationFields form={form} />

        <FieldSeparator />

        <LandlordInformationField form={form} />

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
