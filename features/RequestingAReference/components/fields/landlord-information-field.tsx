import { UseFormReturn } from 'react-hook-form'
import { RequestingAReferenceFormValues } from '../../schemas/requesting-a-reference-schema'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/shared/components/shadcn/ui/field'
import { Input } from '@/shared/components/shadcn/ui/input'
import AnimatedFieldError from '@/shared/components/form/animated-field-error'

type LandlordInformationField = {
  form: UseFormReturn<RequestingAReferenceFormValues>
}

export default function LandlordInformationField({
  form,
}: LandlordInformationField) {
  return (
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
  )
}
