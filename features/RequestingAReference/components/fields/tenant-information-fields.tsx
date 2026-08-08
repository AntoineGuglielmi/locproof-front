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

type TenantInformationFieldsProps = {
  form: UseFormReturn<RequestingAReferenceFormValues>
}

export default function TenantInformationFields({
  form,
}: TenantInformationFieldsProps) {
  return (
    <FieldSet className="w-full">
      <FieldLegend className="text-left">Vos informations</FieldLegend>
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Field data-invalid={!!form.formState.errors.firstname}>
            <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
            <Input
              id="firstname"
              type="text"
              placeholder="Votre prénom"
              aria-invalid={form.formState.errors.firstname ? true : undefined}
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
              aria-invalid={form.formState.errors.lastname ? true : undefined}
              {...form.register('lastname')}
            />
            <AnimatedFieldError error={form.formState.errors.lastname} />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  )
}
