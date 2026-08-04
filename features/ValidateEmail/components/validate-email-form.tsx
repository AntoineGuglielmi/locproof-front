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
    return <ValidateEmailSuccess email={submittedEmail} />
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700"
          >
            Votre email
          </label>

          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            className="mt-2"
            {...form.register('email')}
          />

          {form.formState.errors.email && (
            <p className="text-sm text-red-600 mt-2">
              {form.formState.errors.email.message}
            </p>
          )}

          <p className="text-xs text-gray-500 mt-2">
            Nous l’utilisons uniquement pour vérifier que la demande vient bien
            de vous. Aucun compte à créer.
          </p>
        </div>

        {form.formState.errors.root && (
          <p className="text-sm text-red-600 text-center">
            {form.formState.errors.root.message}
          </p>
        )}

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
    </div>
  )
}
