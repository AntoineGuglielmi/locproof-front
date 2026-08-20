'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
import Button from '@/shared/components/form/button'
import Link from 'next/link'

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
        className="bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-6"
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
      className="bg-white shadow-xl rounded-3xl p-8 flex flex-col gap-6"
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
        >
          {form.formState.isSubmitting
            ? 'Envoi en cours...'
            : 'Recevoir mon lien sécurisé'}
        </Button>

        <hr className="h-px bg-gray-200" />

        <p className="text-sm text-gray-500">Vous avez déjà un profil ?</p>

        <Button
          asChild
          variant="outline"
        >
          <Link href="/profile">Retrouver mon profil</Link>
        </Button>
      </form>
    </MotionDiv>
  )
}
