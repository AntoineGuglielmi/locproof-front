'use client'
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/className'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  retrieveProfileSchema,
  RetriveProfileFormValues,
} from '../schemas/retrieve-profile-schema'
import MotionDiv from '@/shared/components/layout/motion-div'
import { useForm } from 'react-hook-form'
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/shadcn/ui/field'
import { Input } from '@/shared/components/shadcn/ui/input'
import AnimatedFieldError from '@/shared/components/form/animated-field-error'
import Button from '@/shared/components/form/button'
import { ActionRetrieveProfile } from '../actions/ActionRetrieveProfile'
import RetrieveProfileSuccess from './retrieve-profile-success'

type RetrieveProfileFormProps = {
  className?: string
  variant?: 'default' | 'other'
  children?: React.ReactNode
}

const RetrieveProfileFormVariants = cva('RetrieveProfileForm space-y-4', {
  variants: {
    variant: {
      default: '',
      other: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export default function RetrieveProfileForm({
  className,
  variant,
}: RetrieveProfileFormProps) {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  const form = useForm<RetriveProfileFormValues>({
    resolver: zodResolver(retrieveProfileSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: RetriveProfileFormValues) {
    const result = await ActionRetrieveProfile(values)
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
        <RetrieveProfileSuccess email={submittedEmail} />
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
        className={cn(RetrieveProfileFormVariants({ variant, className }))}
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
            : 'Recevoir mon lien'}
        </Button>
      </form>
    </MotionDiv>
  )
}
