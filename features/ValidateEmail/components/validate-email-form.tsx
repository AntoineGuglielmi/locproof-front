'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shared/components/shadcn/ui/button'
import { Input } from '@/shared/components/shadcn/ui/input'

import {
  validateEmailSchema,
  ValidateEmailFormValues,
} from '../schemas/validate-email-schema'

import { ActionValidateEmail } from '../actions/ActionValidateEmail'
import ValidateEmailSuccess from './validate-email-success'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/shadcn/ui/field'
import MotionDiv from '@/shared/components/layout/motion-div'
import AnimatedFieldError from '@/shared/components/form/animated-field-error'

export default function ValidateEmailForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  const form = useForm<ValidateEmailFormValues>({
    resolver: zodResolver(validateEmailSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: ValidateEmailFormValues) {
    const result = await ActionValidateEmail(values)

    if (!result.success) {
      form.setError('root', {
        message: result.error,
      })

      return
    }

    setSubmittedEmail(values.email)
  }

  if (submittedEmail) {
    return (
      <MotionDiv
        layout
        transition={{
          layout: {
            duration: 0.2,
          },
        }}
      >
        <ValidateEmailSuccess email={submittedEmail} />
      </MotionDiv>
    )
  }

  return (
    <MotionDiv
      layout
      transition={{
        layout: {
          duration: 0.2,
        },
      }}
      className="bg-white p-6 rounded-2xl shadow-sm border"
    >
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Field data-invalid={!!form.formState.errors.email}>
            <FieldLabel htmlFor="email">Votre email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              className="mt-2"
              aria-invalid={form.formState.errors.email ? true : undefined}
              {...form.register('email')}
            />
            <FieldDescription>
              Nous l’utilisons uniquement pour vérifier que la demande vient
              bien de vous. Aucun compte à créer.
            </FieldDescription>
            <AnimatedFieldError error={form.formState.errors.email} />
          </Field>
        </FieldGroup>

        <AnimatedFieldError error={form.formState.errors.root} />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full mt-4 rounded-full py-4 text-base bg-indigo-600 hover:bg-indigo-700"
        >
          {form.formState.isSubmitting
            ? 'Envoi en cours...'
            : 'Recevoir mon lien sécurisé'}
        </Button>
      </form>
    </MotionDiv>
  )
}
